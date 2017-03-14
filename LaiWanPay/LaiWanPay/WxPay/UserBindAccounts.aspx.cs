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
    public partial class UserBindAccounts : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (!string.IsNullOrEmpty(Request["OpenID"]))
                {
                    hdOpenId.Value = Request["OpenID"];
                }
                else
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('参数获取出错，请重试！');</script>");
                }
            }
        }

        protected void Bind_Click(object sender, EventArgs e)
        {
            string strUserId = Account.Value.Trim();
            if (strUserId == "")
            {
                this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('请输入游戏ID！');</script>");
                return;
            }
            string strOpenId = hdOpenId.Value.Trim();
            if (!string.IsNullOrEmpty(strOpenId))
            {
                int result = UserPayment.AddUserBindWxInfo(strOpenId, int.Parse(strUserId));

                if (result == 1)
                {
                    DataTable dt = UserPayment.GetUserInfoTable(strOpenId);
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('绑定成功！');location.href='UserPayDefault.aspx?UserID=" + dt.Rows[0]["UserVirtualID"] + "&OpenId="+ strOpenId + "';</script>");
                        return;
                    }
                    else
                    {
                        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('绑定失败，请重试！');</script>");
                    }
                }
                else if (result == -1)
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('该微信已经绑定，不能重复绑定！');</script>");
                }
                else if (result == -2)
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('该游戏ID不存在，请确认！');</script>");
                }
                else if (result == -4)
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('该游戏ID已绑定微信，不能重复绑定！');</script>");
                }
                else
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('网络异常，请稍后重试！');</script>");
                }
            }
            else
            {
                this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('参数获取出错，请重试！');</script>");
            }
        }
    }
}