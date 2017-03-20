using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;
using LaiWanPay.lib;

namespace LaiWanPay.WxPay
{
    public partial class UserJsApiPayPage : System.Web.UI.Page
    {
        public static string wxJsApiParam { get; set; } //H5调起JS API参数
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string openid = Request.QueryString["openid"];
                string total_fee = Request.QueryString["total_fee"];
                string strOrderId = Request.QueryString["orderId"];

                //检测是否给当前页面传递了相关参数
                if (string.IsNullOrEmpty(openid) || string.IsNullOrEmpty(total_fee) || string.IsNullOrEmpty(strOrderId))
                {
                    Response.Write("<span style='color:#FF0000;font-size:20px'>" + "页面传参出错,请返回重试。" + "</span>");
                    return;
                }

                //若传递了相关参数，则调统一下单接口，获得后续相关接口的入口参数
                JsApiPay jsApiPay = new JsApiPay(this);
                jsApiPay.openid = openid;
                jsApiPay.total_fee = int.Parse(total_fee);

                //JSAPI支付预处理
                try
                {
                    string productDesc = "游戏房卡";
                    string attach = strOrderId;
                    string productTag = "";
                    string notifyUrl = "http://pay.laiwan888.com/WxPay/UserPayResultNotifyPage.aspx";

                    WxPayData unifiedOrderResult = jsApiPay.GetUnifiedOrderResult(productDesc, attach, strOrderId, productTag, notifyUrl);

                    wxJsApiParam = jsApiPay.GetJsApiParameters();//获取H5调起JS API参数  
                    //在页面上显示订单信息
                    Response.Write("<span style='color:#000000;font-size:20px;font-weight:bold;'>订单详情：</span><br/>");
                    Response.Write("<span style='color:#D0BF4A;font-size:16px;'>订单编号：" + strOrderId + "</span><br/>");
                    Response.Write("<span style='color:#D0BF4A;font-size:16px;'>订单金额：" + (int.Parse(total_fee) / 100) + " 元</span><br/>");
                    Response.Write("<span style='color:#D0BF4A;font-size:16px;'>订单描述：购买道具房卡</span><br/>");

                }
                catch (Exception ex)
                {
                    Response.Write("<span style='color:#FF0000;font-size:20px'>" + "下单失败，请返回重试。" + "</span>");
                    return;
                }
            }
        }
    }
}