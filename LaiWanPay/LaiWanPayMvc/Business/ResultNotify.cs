using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanBll;
using LaiWanDBUtility;
using LaiWanPayMvc.lib;

namespace LaiWanPayMvc.Business
{
    /// <summary>
    /// 支付结果通知回调处理类
    /// 负责接收微信支付后台发送的支付结果并对订单有效性进行验证，将验证结果反馈给微信支付后台
    /// </summary>
    public class ResultNotify:Notify
    {
        public ResultNotify(HttpContext context) :base(context)
        {
        }

        public override void ProcessNotify()
        {
            WxPayData notifyData = GetNotifyData();

            //检查支付结果中transaction_id是否存在
            if (!notifyData.IsSet("transaction_id"))
            {
                //若transaction_id不存在，则立即返回结果给微信支付后台
                WxPayData res = new WxPayData();
                res.SetValue("return_code", "FAIL");
                res.SetValue("return_msg", "支付结果中微信订单号不存在");
                LogUtils.WriteLogFile("transaction_id不存在，" + res.ToXml(), "WhzPay");
                currentContext.Response.Write(res.ToXml());
                currentContext.Response.End();
            }

            string transaction_id = notifyData.GetValue("transaction_id").ToString();

            //查询订单，判断订单真实性
            if (!QueryOrder(transaction_id))
            {
                //若订单查询失败，则立即返回结果给微信支付后台
                WxPayData res = new WxPayData();
                res.SetValue("return_code", "FAIL");
                res.SetValue("return_msg", "订单查询失败");
                LogUtils.WriteLogFile("订单查询失败，" + res.ToXml(), "WhzPay");
                currentContext.Response.Write(res.ToXml());
                currentContext.Response.End();
            }
            else  //查询订单成功
            {
                WxPayData res = new WxPayData();
                res.SetValue("return_code", "SUCCESS");
                res.SetValue("return_msg", "OK");
                //订单号
                string out_trade_no = notifyData.GetValue("out_trade_no").ToString();
                //充值金额（分为单位）
                string total_fee = notifyData.GetValue("total_fee").ToString();
                LogUtils.WriteLogFile("订单成功，transaction_id：" + transaction_id + "，out_trade_no：" + out_trade_no + "，total_fee：" + total_fee, "WhzPay");
                //处理订单
                Tuple<int, int, int> result = WhzPaymentBll.UpdateOrderInfo(out_trade_no, int.Parse(total_fee)/100, transaction_id);

                string addresult = "";
                if (result.Item1 == 1)
                {
                    string jsonData="cmdNumber=4004&json={\"uid\":"+result.Item2+",\"count\":"+result.Item3+"}";
                    addresult=HttpFunc.HttpPost("http://qwe.laiwan888.cn:9101/cmd", jsonData);
                }
                //1.处理成功，-1.订单已完成，不需重复处理，-2.订单金额错误，-3.充值金额配置错误，-4.数据库异常
                LogUtils.WriteLogFile("订单处理结果：" + result.Item1+"   添加房卡结果："+ addresult, "WhzPay");
                currentContext.Response.Write(res.ToXml());
                currentContext.Response.End();
            }
        }

        //查询订单
        private bool QueryOrder(string transaction_id)
        {
            WxPayData req = new WxPayData();
            req.SetValue("transaction_id", transaction_id);
            WxPayData res = WxPayApi.OrderQuery(req);
            if (res.GetValue("return_code").ToString() == "SUCCESS" &&
                res.GetValue("result_code").ToString() == "SUCCESS")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}