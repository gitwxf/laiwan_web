using System;
using System.Collections.Generic;
using System.Data;
using LaiWanPay.Business;

namespace LaiWanPay.JtPay
{
    public partial class PayAddOrder : System.Web.UI.Page
    {
        /// <summary>
        /// 充值金额
        /// </summary>
        protected readonly IList<int> listPayValue = new List<int>() { 300, 500, 1000 };

        /// <summary>
        /// 终端类型
        /// </summary>
        protected readonly IList<string> listTerminal = new List<string>() { "pc", "androidwx", "androidwap", "ioswx", "ioswap" };

        protected void Page_Load(object sender, EventArgs e)
        {
            string strKindId = Request.QueryString["KindID"];
            string strAgentsId = Request.QueryString["AgentsID"];
            string strPayMoney = Request.QueryString["PayMoney"];
            string strTerminal = Request.QueryString["Terminal"];

            //充值金额(单位元)
            int intPayMoney;
            int.TryParse(strPayMoney, out intPayMoney);

            if (string.IsNullOrEmpty(strKindId) || string.IsNullOrEmpty(strAgentsId) || !listPayValue.Contains(intPayMoney) || !listTerminal.Contains(strTerminal))
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "页面传参出错,请返回重试。" + "</span>");
                return;
            }

            DataTable dtAgentsInfo = AgentsPayment.GetAgentsInfoTable(int.Parse(strAgentsId));
            if (dtAgentsInfo == null)
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "代理帐号不存在，请确认。" + "</span>");
                return;
            }

            if (dtAgentsInfo.Rows.Count == 0)
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "代理帐号不存在，请确认。" + "</span>");
                return;
            }
            Random ran = new Random();

            //生成订单号
            string orderId = string.Format("{0}{1}{2}", "JtPay", DateTime.Now.ToString("yyyyMMddHHmmssfff"), ran.Next(999));
            //插入订单
            int result = AgentsPayment.AddOrderInfo(orderId, int.Parse(strAgentsId), intPayMoney, "", int.Parse(strKindId));
            if (result != 1)
            {
                Response.Write("<span style='color:#FF0000;font-size:20px'>" + "网络异常，请返回重试。" + "</span>");
                return;
            }
            switch (strTerminal)
            {
                case "pc":
                    Response.Redirect("PcPayTypeChange.aspx?OrderId=" + orderId + "&PayMoney=" + strPayMoney + "&Terminal=pc&AgentsID="+ strAgentsId, true);
                    break;
                case "androidwx":                    
                    Response.Redirect("JtpayPost.aspx?amount=" + strPayMoney + "&payAccounts=" + strAgentsId + "&orderId="+ orderId + "&p9_paymethod=3&p25_terminal=3&p26_iswappay=4", true);
                    break;
                case "androidwap":
                    Response.Redirect("MobilePayTypeChange.aspx?OrderId=" + orderId + "&PayMoney=" + strPayMoney + "&Terminal=androidwap&AgentsID=" + strAgentsId, true);
                    break;
                case "ioswx":
                    Response.Redirect("JtpayPost.aspx?amount=" + strPayMoney + "&payAccounts=" + strAgentsId + "&orderId=" + orderId + "&p9_paymethod=3&p25_terminal=2&p26_iswappay=4", true);
                    break;
                case "ioswap":
                    Response.Redirect("MobilePayTypeChange.aspx?OrderId=" + orderId + "&PayMoney=" + strPayMoney + "&Terminal=ioswap&AgentsID=" + strAgentsId, true);
                    break;
                default: break;
            }

        }
    }
}