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
    public partial class AgentsNameConfirm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["AgentsID"] != null && Request.QueryString["AgentsID"].ToString() != "")
                {
                    hdAgentsId.Value = Request.QueryString["AgentsID"].ToString();
                    DataTable dt = AgentsPayment.GetAgentsInfoTable(int.Parse(hdAgentsId.Value));
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        ltAgentsName.Text= dt.Rows[0]["AgentsName"].ToString();
                        hdAgentsName.Value = dt.Rows[0]["AgentsName"].ToString();
                    }
                    else
                    {
                        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('网络异常，请稍后重试。');</script>");
                    }
                }
                if (Request.QueryString["KindID"] != null && Request.QueryString["KindID"].ToString() != "")
                {
                    hdKindId.Value = Request.QueryString["KindID"].ToString();
                }
                if (Request.QueryString["OpenId"] != null && Request.QueryString["OpenId"].ToString() != "")
                {
                    hdOpenId.Value = Request.QueryString["OpenId"].ToString();
                }
            }
        }
    }
}