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
    public partial class UserPayDefault : System.Web.UI.Page
    {
        protected string UserId = "";
        protected string NickName = "";
        protected string GameName = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["UserID"] != null && Request.QueryString["UserID"].ToString() != "")
                {
                    hdUserId.Value = Request.QueryString["UserID"].ToString();
                    DataTable dt = UserPayment.GetUserInfoTable(int.Parse(hdUserId.Value));
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        UserId = dt.Rows[0]["GameID"].ToString();
                        NickName = dt.Rows[0]["NickName"].ToString();
                        GameName = dt.Rows[0]["KindID"].ToString() == "826" ? "徕玩跑得快" : "徕玩麻将";
                    }
                    else
                    {
                        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('网络异常，请稍后重试。');</script>");
                    }
                }
                if (Request.QueryString["OpenId"] != null && Request.QueryString["OpenId"].ToString() != "")
                {
                    hdOpenId.Value = Request.QueryString["OpenId"].ToString();
                }
            }
        }
    }
}