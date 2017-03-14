using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;

namespace LaiWanPay.WxPay
{
    public partial class UserPayResultNotifyPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            UserPayResultNotify resultNotify = new UserPayResultNotify(this);
            resultNotify.ProcessNotify();
        }
    }
}