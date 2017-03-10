using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;

namespace LaiWanPay.WxPay
{
    public partial class PayValidate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string strKindId = Request.QueryString["KindID"];
            string strAgentsId = Request.QueryString["AgentsID"];
            
            if (string.IsNullOrEmpty(strKindId) || string.IsNullOrEmpty(strAgentsId))
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

            Response.Redirect("ProductPage.aspx?KindID=" + strKindId + "&AgentsID=" + strAgentsId, true);

        }
    }
}