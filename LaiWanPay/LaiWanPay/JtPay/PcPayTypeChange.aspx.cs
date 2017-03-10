using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LaiWanPay.JtPay
{
    public partial class PcPayTypeChange : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["OrderId"] != null && Request.QueryString["OrderId"].ToString() != "")
                {
                    hdOrderId.Value = Request.QueryString["OrderId"].ToString();
                }
                if (Request.QueryString["PayMoney"] != null && Request.QueryString["PayMoney"].ToString() != "")
                {
                    hdPayMoney.Value = Request.QueryString["PayMoney"].ToString();
                    AmountPayable.Text = Request.QueryString["PayMoney"].ToString();
                }
                if (Request.QueryString["AgentsID"] != null && Request.QueryString["AgentsID"].ToString() != "")
                {
                    hdAgentsId.Value = Request.QueryString["AgentsID"].ToString();
                }
            }
        }
    }
}