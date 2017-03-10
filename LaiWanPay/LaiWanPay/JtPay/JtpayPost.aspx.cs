using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Web.Security;
using System.Configuration;

namespace LaiWanPay.JtPay
{
    public partial class JtpayPost : System.Web.UI.Page
    {
        public enum PayMethod
        {
            网银 = 1,
            快捷支付 = 2,
            微信 = 3,
            支付宝 = 4,
            游戏点卡 = 5
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


        public RequestBean requestBean = null;

        protected void Page_Load(object sender, EventArgs e)
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

            this.p1_usercode.Value = ConfigurationSettings.AppSettings["p1_usercode"]; //商户号;
            this.p2_order.Value = orderNo;//订单前坠加订单号
            this.p3_money.Value = txtAmount;
            this.p4_returnurl.Value = ConfigurationSettings.AppSettings["p4_returnurl"];
            this.p5_notifyurl.Value = ConfigurationSettings.AppSettings["p5_notifyurl"];
            this.p6_ordertime.Value = DateTime.Now.ToString("yyyyMMddHHmmss");
            this.p7_sign.Value = "";
            this.p8_signtype.Value = "1";//MD5
            this.p9_paymethod.Value = p9_paymethod;
            if (p9_paymethod.Equals("5"))//如果为卡类支付需要设置卡号和卡密
            {
                this.p19_productcat.Value = Request.QueryString["p19_productcat"];
                this.p20_productnum.Value = Request.QueryString["p20_productnum"];
            }
            this.p10_paychannelnum.Value = p10_paychannelnum;
            this.p14_customname.Value = txtPayAccounts;
            this.p17_customip.Value = GetIP();
            this.p18_product.Value = ConfigurationSettings.AppSettings["p18_product"];
            this.p25_terminal.Value = p25_terminal;
            this.p26_iswappay.Value = p26_iswappay;
            requestBean = new RequestBean()
            {
                p1_usercode = this.p1_usercode.Value,
                p2_order = this.p2_order.Value,
                p3_money = this.p3_money.Value,
                p4_returnurl = this.p4_returnurl.Value,
                p5_notifyurl = this.p5_notifyurl.Value,
                p6_ordertime = this.p6_ordertime.Value,
                p7_sign = "",
                p8_signtype = "1",
                p9_paymethod = int.Parse(this.p9_paymethod.Value),
                p10_paychannelnum = this.p10_paychannelnum.Value,
                p18_product = this.p18_product.Value,
            };
            this.p7_sign.Value = GetSign(requestBean);
            //提交form表单到requestUrl
            form1.Action =ConfigurationSettings.AppSettings["requestUrl"];
            //ScriptManager.RegisterStartupScript(this.Page, GetType(), "post1", "Post();", true);
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

            result = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(result))
            {
                result = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            if (string.IsNullOrEmpty(result))
            {
                result = HttpContext.Current.Request.UserHostAddress;
            }
            if (string.IsNullOrEmpty(result))
            {
                return "127.0.0.1";
            }
            return result;
        }
    }
}