using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;

namespace LaiWanPay.JtPay
{
    public partial class UserIsBind : System.Web.UI.Page
    {         
        /// <summary>
        /// 调用js获取收货地址时需要传入的参数
        /// 格式：json串
        /// 包含以下字段：
        ///     appid：公众号id
        ///     scope: 填写“jsapi_address”，获得编辑地址权限
        ///     signType:签名方式，目前仅支持SHA1
        ///     addrSign: 签名，由appid、url、timestamp、noncestr、accesstoken参与签名
        ///     timeStamp：时间戳
        ///     nonceStr: 随机字符串
        /// </summary>
        public static string wxEditAddrParam { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                JsApiPay jsApiPay = new JsApiPay(this);
                try
                {
                    //调用【网页授权获取用户信息】接口获取用户的openid和access_token
                    jsApiPay.GetOpenidAndAccessToken();
                    ViewState["openid"] = jsApiPay.openid;
                    if (jsApiPay.openid != "")
                    {
                        DataTable dt = UserPayment.GetUserInfoTable(jsApiPay.openid);
                        if (dt != null && dt.Rows.Count > 0)
                        {
                            Response.Redirect("UserPayDefault.aspx?UserID=" + dt.Rows[0]["UserVirtualID"] + "&OpenId=" + jsApiPay.openid, true);
                            return;
                        }
                        else
                        {
                            Response.Redirect("UserBindAccounts.aspx?OpenID=" + jsApiPay.openid, true);
                            return;
                        }
                    }
                    else
                    {
                        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('参数获取错误，请重试。');</script>");
                        return;
                    }
                }
                catch (Exception ex)
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('页面加载出错，请重试。');</script>");
                    return;
                }
            }
        }
    }
}