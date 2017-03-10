using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;
using LaiWanPay.DBUtility;

namespace LaiWanPay.JtPay
{
    public partial class Notify : System.Web.UI.Page
    {
        string userCode = ConfigurationSettings.AppSettings["p1_usercode"];
        //商户密钥(由竣付通注册后分配)
        string compKey = ConfigurationSettings.AppSettings["compKey"];
        public class ResponseBean
        {
            HttpRequest Request { get; set; }
            /// <summary>
            /// 商户号
            /// </summary>
            public string p1_usercode { get { return Request.Params["p1_usercode"]; } }
            /// <summary>
            /// 订单号
            /// </summary>
            public string p2_order { get { return Request.Params["p2_order"]; } }
            /// <summary>
            /// 订单金额
            /// </summary>
            public string p3_money { get { return Request.Params["p3_money"]; } }
            /// <summary>
            /// 支付结果
            /// </summary>
            public string p4_status { get { return Request.Params["p4_status"]; } }

            /// <summary>
            /// 竣付通订单号
            /// </summary>
            public string p5_jtpayorder { get { return Request.Params["p5_jtpayorder"]; } }
            /// <summary>
            /// 商户支付方式
            /// </summary>
            public string p6_paymethod { get { return Request.Params["p6_paymethod"]; } }
            /// <summary>
            /// 支付通道编码(银行,卡类编码)
            /// </summary>
            public string p7_paychannelnum { get { return Request.Params["p7_paychannelnum"]; } }
            /// <summary>
            /// 编码方式
            /// </summary>
            public string p8_charset { get { return Request.Params["p8_charset"]; } }
            /// <summary>
            /// 签名验证方式
            /// </summary>
            public string p9_signtype { get { return Request.Params["p9_signtype"]; } }
            /// <summary>
            /// 签名
            /// </summary>
            public string p10_sign { get { return Request.Params["p10_sign"]; } }
            /// <summary>
            /// 备注
            /// </summary>
            public string p11_remark { get { return Request.Params["p11_remark"]; } }

            public ResponseBean(HttpRequest request)
            {
                this.Request = request;
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            ResponseBean responseBean = new ResponseBean(Request);
            var sign = GetSign(responseBean);
            //LogUtils.WriteLogFile("订单成功，竣付通单号：" + responseBean.p5_jtpayorder + "，徕玩单号：" + responseBean.p2_order + "，金额：" + responseBean.p3_money, "JtPay订单处理");
            if (sign.Equals(responseBean.p10_sign))
            {
                //服务器操作
                LogUtils.WriteLogFile("订单成功，竣付通单号：" + responseBean.p5_jtpayorder + "，徕玩单号：" + responseBean.p2_order + "，金额：" + responseBean.p3_money, "JtPay订单处理");
                //处理订单
                int result = AgentsPayment.UpdateOrderInfo(responseBean.p2_order, int.Parse(responseBean.p3_money), responseBean.p5_jtpayorder);
                //1.处理成功，-1.订单已完成，不需重复处理，-2.订单金额错误，-3.充值金额配置错误，-4.数据库异常
                LogUtils.WriteLogFile("订单处理结果：" + result, "JtPay订单处理");
                Response.Write("Success");
            }
        }
        private string GetSign(ResponseBean bean)
        {
            if (bean.p7_paychannelnum == null)
            {
                string p7_paychannelnum = "";
                string rawString = bean.p1_usercode + "&" + bean.p2_order + "&" + bean.p3_money + "&" + bean.p4_status + "&" + bean.p5_jtpayorder + "&" + bean.p6_paymethod + "&" + p7_paychannelnum + "&" + bean.p8_charset + "&" + bean.p9_signtype + "&" + compKey;
                return FormsAuthentication.HashPasswordForStoringInConfigFile(rawString, "MD5");
            }
            else
            {
                string rawString = bean.p1_usercode + "&" + bean.p2_order + "&" + bean.p3_money + "&" + bean.p4_status + "&" + bean.p5_jtpayorder + "&" + bean.p6_paymethod + "&" + bean.p7_paychannelnum + "&" + bean.p8_charset + "&" + bean.p9_signtype + "&" + compKey;
                return FormsAuthentication.HashPasswordForStoringInConfigFile(rawString, "MD5");
            }
        }
    }
}