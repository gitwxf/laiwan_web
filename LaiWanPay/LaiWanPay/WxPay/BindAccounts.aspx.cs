using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LaiWanPay.Business;
using LaiWanPay.DBUtility;

namespace LaiWanPay.WxPay
{
    public partial class BindAccounts : System.Web.UI.Page
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
                if (!string.IsNullOrEmpty(Request["OpenID"]))
                {
                    hdOpenId.Value = Request["OpenID"];
                }
                else
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('参数获取出错，请重试！');</script>");
                    return;
                }
                //    JsApiPay jsApiPay = new JsApiPay(this);
                //    try
                //    {
                //        //调用【网页授权获取用户信息】接口获取用户的openid和access_token
                //        jsApiPay.GetOpenidAndAccessToken();
                //        ViewState["openid"] = jsApiPay.openid;
                //    }
                //    catch (Exception ex)
                //    {
                //        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('页面加载出错，请重试。');</script>");
                //        return;
            }
        }

        protected void Bind_Click(object sender, EventArgs e)
        {
            string strAgentsName = Account.Value.Trim();
            if (strAgentsName == "")
            {
                this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('请输入代理帐号！');</script>");
                return;
            }
            string strPwd = Password.Value.Trim();
            if (strPwd == "")
            {
                this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('请输入帐号密码！');</script>");
                return;
            }
            string strOpenId = hdOpenId.Value.Trim();
            if (!string.IsNullOrEmpty(strOpenId))
            {
                string strMiWen = GetMd5Str32(strPwd).ToUpper();
                //LogUtils.WriteLogFile("密码明文：" + strPwd + "，密文：" + strMiWen, "11111");
                int result = AgentsPayment.AddAgentsBindWxInfo(strOpenId, strAgentsName, strMiWen);

                if (result == 1)
                {
                    DataTable dt = AgentsPayment.GetAgentsInfoTable(strOpenId);
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('绑定成功！');location.href='ProductPage.aspx?AgentsID=" + dt.Rows[0]["AgentsID"] + "&KindID=" + dt.Rows[0]["KindID"] + "';</script>");
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
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('该代理帐号不存在，请确认！');</script>");
                }
                else if (result == -3)
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('帐号密码不正确，请重试！');</script>");
                }
                else if (result == -4)
                {
                    this.ClientScript.RegisterStartupScript(this.GetType(), "key", "<script type='text/javascript'>alert('该代理帐号已绑定微信，不能重复绑定！');</script>");
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


        /// <summary>
        /// MD5(32位加密)
        /// </summary>
        /// <param name="str">需要加密的字符串</param>
        /// <returns>MD5加密后的字符串</returns>
        public static string GetMd5HashStr(string str)
        {
            string pwd = string.Empty;
            //实例化一个md5对像
            MD5 md5 = MD5.Create();
            // 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] s = md5.ComputeHash(Encoding.UTF8.GetBytes(str));
            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < s.Length; i++)
            {
                // 将得到的字符串使用十六进制类型格式。格式后的字符是小写的字母，如果使用大写（X）则格式后的字符是大写字符 
                pwd = pwd + s[i].ToString("X");
            }
            return pwd;
        }




        /// <summary>
        /// MD5 32位加密 加密后密码为小写
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        private string GetMd5Str32(string text)
        {
            try
            {
                using (MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider())
                {
                    byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(text));
                    StringBuilder sBuilder = new StringBuilder();
                    for (int i = 0; i < data.Length; i++)
                    {
                        sBuilder.Append(data[i].ToString("x2"));
                    }
                    return sBuilder.ToString().ToLower();
                }
            }
            catch { return ""; }
        }
    }
}