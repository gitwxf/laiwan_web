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
    public partial class UserPayAddOrder : System.Web.UI.Page
    {

        /// <summary>
        /// 充值金额
        /// </summary>
        protected readonly IList<int> listPayValue = new List<int>() { 10, 20, 30, 60, 100, 200 };
        /// <summary>
        /// 终端类型
        /// </summary>
        protected readonly IList<string> listTerminal = new List<string>() { "androidwx", "ioswx" };

        protected void Page_Load(object sender, EventArgs e)
        {
            string strUserId = Request.QueryString["UserID"];
            string strPayMoney = Request.QueryString["PayMoney"];
            string strTerminal = Request.QueryString["Terminal"];

            //充值金额(单位元)
            int intPayMoney;
            int.TryParse(strPayMoney, out intPayMoney);

            if (string.IsNullOrEmpty(strUserId) || !listPayValue.Contains(intPayMoney) || !listTerminal.Contains(strTerminal))
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "页面传参出错,请返回重试。" + "</span>");
                return;
            }

            DataTable dtUserInfo = UserPayment.GetUserInfoTable(int.Parse(strUserId));
            if (dtUserInfo == null)
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "游戏ID不存在，请确认。" + "</span>");
                return;
            }

            if (dtUserInfo.Rows.Count == 0)
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "游戏ID不存在，请确认。" + "</span>");
                return;
            }
            Random ran = new Random();

            //生成订单号
            string orderId = string.Format("{0}{1}{2}", "JtPay", DateTime.Now.ToString("yyyyMMddHHmmssfff"), ran.Next(999));
            //插入订单
            int result = UserPayment.AddOrderInfo(orderId, int.Parse(strUserId), intPayMoney, "");
            if (result != 1)
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "网络异常，请返回重试。" + "</span>");
                return;
            }
            switch (strTerminal)
            {
                case "androidwx":
                    Response.Redirect("UserJtpayPost.aspx?amount=" + strPayMoney + "&payAccounts=" + strUserId + "&orderId=" + orderId + "&p9_paymethod=3&p25_terminal=3&p26_iswappay=4", true);
                    break;
                case "ioswx":
                    Response.Redirect("UserJtpayPost.aspx?amount=" + strPayMoney + "&payAccounts=" + strUserId + "&orderId=" + orderId + "&p9_paymethod=3&p25_terminal=2&p26_iswappay=4", true);
                    break;
                default: break;
            }
        }
    }
}