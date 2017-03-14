using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;
using LaiWanPay.DBUtility;
using LaiWanPay.lib;

namespace LaiWanPay.WxPay
{
    public partial class ProductPage : System.Web.UI.Page
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
                    string strAgentsId = Request.QueryString["AgentsID"];
                    string strKindID = Request.QueryString["KindID"];

                    if (!string.IsNullOrEmpty(strAgentsId) && !string.IsNullOrEmpty(strKindID))
                    {
                        CSession.Set("AgentsID", strAgentsId);
                        CSession.Set("KindID", strKindID);
                    }

                    //调用【网页授权获取用户信息】接口获取用户的openid和access_token
                    jsApiPay.GetOpenidAndAccessToken();
                    //获取收货地址js函数入口参数
                    //wxEditAddrParam = jsApiPay.GetEditAddressParameters();
                    ViewState["openid"] = jsApiPay.openid;

                    if (jsApiPay.openid != "")
                    {
                        //添加绑定信息
                        strAgentsId = CSession.GetString("AgentsID");
                        strKindID = CSession.GetString("KindID");

                        if (strAgentsId != "" && strKindID != "")
                        {
                            int bindInfo = AgentsPayment.AddAgentsBindWxInfo(jsApiPay.openid, int.Parse(strAgentsId), int.Parse(strKindID));
                            if (bindInfo == 0)
                            {
                                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "网络异常，请稍后重试。" + "</span>");
                                Button1.Visible = false;
                                AmountPayable.Visible = false;
                            }
                        }
                        else
                        {
                            Response.Write("<span style='color:#FF0000;font-size:20px'>" + "绑定信息出错，请稍后重试。" + "</span>");
                            Button1.Visible = false;
                            AmountPayable.Visible = false;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Response.Write("<span style='color:#FF0000;font-size:20px'>" + "页面加载出错，请重试。" + "</span>");
                    Button1.Visible = false;
                    AmountPayable.Visible = false;
                }
            }
        }

        /// <summary>
        /// 充值金额
        /// </summary>
        protected readonly IList<int> listPayValue = new List<int>() { 500, 1000, 2000 };

        /// <summary>
        /// 提交支付
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Button1_Click(object sender, EventArgs e)
        {
            string total_fee = this.hdpaymoney.Value;
            //total_fee = "1";
            if (ViewState["openid"] != null)
            {
                string openid = ViewState["openid"].ToString();
                DataTable dt = AgentsPayment.GetAgentsInfoTable(openid);
                if (dt != null && dt.Rows.Count > 0)
                {
                    int intPayMoney;
                    int.TryParse(total_fee, out intPayMoney);

                    if (!listPayValue.Contains(intPayMoney))
                    {
                        Response.Write("<span style='color:#FF0000;font-size:20px'>" + "充值金额错误，请确认。" + "</span>");
                        return;
                    }
                    //生成订单号
                    string orderId = WxPayApi.GenerateOutTradeNo();
                    //插入订单
                    int result = AgentsPayment.AddOrderInfo(orderId, Convert.ToInt32(dt.Rows[0]["AgentsID"]), intPayMoney, "", Convert.ToInt32(dt.Rows[0]["KindID"]));
                    if (result != 1)
                    {
                        Response.Write("<span style='color:#FF0000;font-size:20px'>" + "网络异常，请返回重试。" + "</span>");
                        return;
                    }
                    string url = "JsApiPayPage.aspx?openid=" + openid + "&total_fee=" + (intPayMoney*100) + "&orderId=" + orderId;
                    //清除Session
                    if (CSession.Get("AgentsID") != null)
                    {
                        CSession.RemoveSession("AgentsID");
                    }
                    if (CSession.Get("KindID") != null)
                    {
                        CSession.RemoveSession("KindID");
                    }
                    //JsApi支付
                    Response.Redirect(url, true);
                }
                else
                {
                    Response.Write("<span style='color:#FF0000;font-size:20px'>" + "参数错误，请返回重试。" + "</span>");
                    Button1.Visible = false;
                    AmountPayable.Visible = false;
                }
            }
            else
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "页面缺少参数，请返回重试。" + "</span>");
                Button1.Visible = false;
                AmountPayable.Visible = false;
            }
        }
    }
}