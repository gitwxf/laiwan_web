using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Drawing;
using System.Text;
using ThoughtWorks;
using ThoughtWorks.QRCode;
using ThoughtWorks.QRCode.Codec;
using ThoughtWorks.QRCode.Codec.Data;
using LaiWanPay.lib;
using LaiWanPay.Business;
using System.Data;

namespace LaiWanPay.WxPay
{
    public partial class NativePayPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {            
            string strOrderId = Request["OrderId"];
            string strPayMoney = Request["PayMoney"];

            //充值金额(分为单位)
            int intPayMoney;
            int.TryParse(strPayMoney, out intPayMoney);

            if (string.IsNullOrEmpty(strOrderId))
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "页面传参出错,请返回重试。" + "</span>");
                return;
            }            
            
            //生成扫码支付模式url
            NativePay nativePay = new NativePay();
            //string orderId = WxPayApi.GenerateOutTradeNo();
            string productDesc = "游戏房卡";
            string attach = strOrderId;
            string productTag = "";
            string url = nativePay.GetPayUrl(productDesc, attach, strOrderId, intPayMoney, productTag, strPayMoney);

            ltOrderID.Text = strOrderId;
            ltPayMoney.Text = (intPayMoney / 100).ToString();
            //将url生成二维码图片
            ewm_img.ImageUrl = "MakeQRCode.aspx?data=" + HttpUtility.UrlEncode(url);


        }
    }
}