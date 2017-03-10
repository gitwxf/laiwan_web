using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PaySubmit.Controllers
{
    public class JtPayController : Controller
    {
        public enum PayMethod
        {
            网银 = 1,
            快捷支付 = 2,
            微信 = 3,
            支付宝 = 4,
            游戏点卡 = 5
        }

        public RequestBean requestBean = null;

        public ActionResult JtPayPost()
        {
            var p25_terminal = Request.QueryString["p25_terminal"] ?? "";
            var p26_iswappay = Request.QueryString["p26_iswappay"] ?? "";
            var txtAmount = Request.QueryString["amount"];//<!--金额：元-->
            var txtPayAccounts = Request.QueryString["payAccounts"];
            var p9_paymethod = Request.QueryString["p9_paymethod"];
            var p10_paychannelnum = "";

            var p1_usercode = ConfigurationSettings.AppSettings["p1_usercode"]; //商户号       

            var orderNo = Request.QueryString["orderId"];

            decimal amount = Convert.ToDecimal(txtAmount);
            
            ViewData["p1_usercode"]= ConfigurationSettings.AppSettings["p1_usercode"]; //商户号;
            ViewData["p2_order"] = orderNo;
            ViewData["p3_money"] = txtAmount;
            ViewData["p4_returnurl"] = ConfigurationSettings.AppSettings["p4_returnurl"];
            ViewData["p5_notifyurl"] = ConfigurationSettings.AppSettings["p5_notifyurl"];
            ViewData["p6_ordertime"] = DateTime.Now.ToString("yyyyMMddHHmmss");
            //ViewData["p7_sign"] = "";
            ViewData["p8_signtype"] = "1";//MD5
            ViewData["p9_paymethod"] = p9_paymethod;
            if (p9_paymethod.Equals("5"))//如果为卡类支付需要设置卡号和卡密
            {
                ViewData["p19_productcat"] = Request.QueryString["p19_productcat"];
                ViewData["p20_productnum"] = Request.QueryString["p20_productnum"];
            }
            ViewData["p10_paychannelnum"] = p10_paychannelnum;
            ViewData["p14_customname"] = txtPayAccounts;
            ViewData["p17_customip"] = GetIP();
            ViewData["p18_product"] = ConfigurationSettings.AppSettings["p18_product"];
            ViewData["p25_terminal"] = p25_terminal;
            ViewData["p26_iswappay"] = p26_iswappay;
            requestBean = new RequestBean()
            {
                p1_usercode = p1_usercode,
                p2_order = orderNo,
                p3_money = amount.ToString(),
                p4_returnurl = ViewData["p4_returnurl"].ToString(),
                p5_notifyurl = ViewData["p5_notifyurl"].ToString(),
                p6_ordertime = ViewData["p6_ordertime"].ToString(),
                p7_sign = "",
                p8_signtype = "1",
                p9_paymethod = int.Parse(p9_paymethod),
                p10_paychannelnum = p10_paychannelnum,
                p18_product = ViewData["p18_product"].ToString(),
            };
            ViewData["p7_sign"] = GetSign(requestBean);
            //提交form表单到requestUrl
            ViewData["FormAction"] = ConfigurationSettings.AppSettings["requestUrl"];

            return View();
        }


        private string GetSign(RequestBean bean)
        {
            string rawString = bean.p1_usercode + "&" + bean.p2_order + "&" + bean.p3_money + "&" + bean.p4_returnurl +
                               "&" + bean.p5_notifyurl + "&" + bean.p6_ordertime + ConfigurationSettings.AppSettings["compKey"];

            return FormsAuthentication.HashPasswordForStoringInConfigFile(rawString, "MD5");
        }

        public string GetIP()
        {
            string result = String.Empty;

            result = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(result))
            {
                result = Request.ServerVariables["REMOTE_ADDR"];
            }
            if (string.IsNullOrEmpty(result))
            {
                result = Request.UserHostAddress;
            }
            if (string.IsNullOrEmpty(result))
            {
                return "127.0.0.1";
            }
            return result;
        }
    }

    public class RequestBean
    {
        /// <summary>
        /// 商户号
        /// </summary>
        public string p1_usercode { get; set; }
        /// <summary>
        /// 订单号
        /// </summary>
        public string p2_order { get; set; }
        /// <summary>
        /// 订单金额
        /// </summary>
        public string p3_money { get; set; }
        /// <summary>
        /// 明文跳转
        /// </summary>
        public string p4_returnurl { get; set; }

        /// <summary>
        /// 服务器异步通知地址
        /// </summary>
        public string p5_notifyurl { get; set; }
        /// <summary>
        /// 订单时间 格式:yyyymmddhhmmss
        /// </summary>
        public string p6_ordertime { get; set; }
        /// <summary>
        /// 签名
        /// </summary>
        public string p7_sign { get; set; }
        /// <summary>
        /// 签名方式 (非必填)
        /// </summary>
        public string p8_signtype { get; set; }
        /// <summary>
        /// 支付方式:1:网银 2:快捷 3:微信 4:支付宝 5:游戏点卡 6:竣付通账户 7:预付费卡 8:人民币 9:授信额度
        /// </summary>
        public int p9_paymethod { get; set; }
        /// <summary>
        /// 支付通道编码(银行编码或卡类编码)
        /// </summary>
        public string p10_paychannelnum { get; set; }
        /// <summary>
        /// 玩家名称
        /// </summary>
        public string p14_customname { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>        
        public string p18_product { get; set; }
        /// <summary>
        /// 终端设备
        /// </summary>
        public string p25_terminal { get; set; }
        /// <summary>
        /// 支付场景
        /// </summary>
        public string p26_iswappay { get; set; }
        /// <summary>
        /// 转换为post数据
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            string str = "p1_usercode=" + p1_usercode + "&p2_order=" + p2_order + "&p3_money=" + p3_money + "&p4_returnurl=" + p4_returnurl +
                         "&p5_notifyurl=" + p5_notifyurl + "&p6_ordertime=" + p6_ordertime + "&p7_sign=" + p7_sign + "&p8_signtype=" + p8_signtype + "&p9_paymethod=" +
                         p9_paymethod + "&p10_paychannelnum=" + p10_paychannelnum + p14_customname + "&p14_customname" + p18_product + "&p18_product" + p25_terminal + "&p25_terminal" + p26_iswappay + "&p26_iswappay";
            return str;
        }
    }
}