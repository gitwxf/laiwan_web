using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Web.Mvc;
using LaiWanBll;
using LaiWanDBUtility;
using LaiWanEntity;
using LaiWanInterface;
using LaiWanPayMvc.Business;
using LaiWanPayMvc.lib;
using LitJson;

namespace LaiWanPayMvc.Controllers
{
    public class WhzPayController : Controller
    {
        private IUserInfoEntity _userInfoEntity;
        private IBindAgentEntity _bindAgent;

        public WhzPayController(IUserInfoEntity userInfo, IBindAgentEntity bindAgent)
        {
            _userInfoEntity = userInfo;
            _bindAgent = bindAgent;
        }


        public async Task<ActionResult> AccessToken(string openid, string unionid)
        {
            //openid = "o-hCuwHiuZEiHqAEDZybbAKOuCDc";
            //unionid = "oFE8hxJo1jigN1RfijubamafBA60";
            string code = "1";
            if (!string.IsNullOrEmpty(openid) && !string.IsNullOrEmpty(unionid))
            {
                var userinfo = await this._userInfoEntity.FindManyAsync(x => x.unionid == unionid);
                if (userinfo != null && userinfo.Count > 0)
                {
                    var bindinfo = await this._bindAgent.IsUidExists(userinfo[0].uid);
                    if (bindinfo)
                    {
                        Response.Redirect("/WhzPay/PayBind?uid=" + userinfo[0].uid + "&name=" + userinfo[0].name + "&openid=" + openid + "&unionid=" + unionid, true);
                    }
                    else
                    {
                        Response.Redirect("/WhzPay/PayDefault?uid=" + userinfo[0].uid + "&name=" + userinfo[0].name + "&openid=" + openid + "&unionid=" + unionid, true);
                        //ViewData["Uid"] = userinfo[0].uid;
                        //ViewData["Name"] = userinfo[0].name;
                        //ViewData["openid"] = openid;
                        //ViewData["unionid"] = unionid;
                        //code = "-3";
                    }
                }
                else
                {
                    code = "-1";
                }
            }
            else
            {
                code = "-2";
            }
            ViewBag.Code = code;
            return View();
        }

        /// <summary>
        /// 绑定代理账号
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="name"></param>
        /// <param name="openid"></param>
        /// <param name="unionid"></param>
        /// <returns></returns>
        public ActionResult BindAgent(string uid = "", string name = "", string openid = "", string unionid = "")
        {
            string code = "1";
            if (uid == "" || name == "" || openid == "" || unionid == "")
            {
                code = "-1";
            }
            else
            {
                ViewData["Uid"] = uid;
                ViewData["Name"] = name;
                ViewData["OpenId"] = openid;
                ViewData["UnionId"] = unionid;
            }
            ViewBag.Code = code;
            return View();
        }

        /// <summary>
        /// 绑定账号
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult BindAgent(FormCollection collection)
        {
            if (string.IsNullOrEmpty(collection["account"]) || string.IsNullOrEmpty(collection["uid"]))
            {
                return Content("-1");
            }
            if (collection["account"].ToLower() == "admin")
            {
                return Content("-2");
            }
            int agentId;
            int.TryParse(collection["account"], out agentId);
            DataTable dt =new DataTable();
            if (agentId>1000)
            {
                dt = AgentEntityBll.GetAgentsInfoTable(agentId);
            }
            else
            {
                dt = AgentEntityBll.GetAgentsInfoTable(collection["account"]);
            }
            if (dt != null && dt.Rows.Count > 0)
            {
                BindAgentEntity agentEntity = new BindAgentEntity
                {
                    uid = collection["uid"],
                    agentid = Convert.ToInt32(dt.Rows[0]["id"]),
                    agentname = dt.Rows[0]["name"].ToString(),
                    addtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
                };
                _bindAgent.CreateUser(agentEntity);
                return Content("1");
            }
            return Content("-2");
        }

        /// <summary>
        /// 未绑定代理充值
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="name"></param>
        /// <param name="openid"></param>
        /// <param name="unionid"></param>
        /// <returns></returns>
        public ActionResult PayDefault(string uid = "", string name = "", string openid = "", string unionid = "")
        {
            string code = "1";
            if (uid == "" || name == "" || openid == "" || unionid == "")
            {
                code = "-1";
            }
            else
            {
                ViewData["Uid"] = uid;
                ViewData["Name"] = name;
                ViewData["OpenId"] = openid;
                ViewData["UnionId"] = unionid;
            }
            ViewBag.Code = code;
            return View();
        }

        /// <summary>
        /// 绑定代理充值
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="name"></param>
        /// <param name="openid"></param>
        /// <param name="unionid"></param>
        /// <returns></returns>
        public ActionResult PayBind(string uid = "", string name = "", string openid = "", string unionid = "")
        {
            string code = "1";
            if (uid == "" || name == "" || openid == "" || unionid == "")
            {
                code = "-1";
            }
            else
            {
                ViewData["Uid"] = uid;
                ViewData["Name"] = name;
                ViewData["OpenId"] = openid;
                ViewData["UnionId"] = unionid;
            }
            ViewBag.Code = code;
            return View();
        }


        /// <summary>
        /// 充值金额
        /// </summary>
        protected readonly IList<int> listPayValue = new List<int>() {10, 20, 30, 50, 100, 200};

        /// <summary>
        /// 订单验证页面
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="PayMoney"></param>
        /// <param name="OpenID"></param>
        /// <returns></returns>
        public async Task<ActionResult> PayAddOrder(string UserID = "", int PayMoney = 0, string OpenID = "")
        {
            string code = "1";
            if (UserID == "" || OpenID == "" || !listPayValue.Contains(PayMoney))
            {
                code = "-1";
            }
            else
            {
                var userresult = await this._userInfoEntity.IsUidExists(UserID);
                if (userresult)
                {
                    int agentId = 0;
                    var bindinfo = await this._bindAgent.FindManyAsync(x=>x.uid== UserID);
                    if (bindinfo != null && bindinfo.Count > 0)
                    {
                        agentId=bindinfo[0].agentid;
                    }
                    //生成订单号
                    Random ran = new Random();
                    string orderId = string.Format("{0}{1}{2}", "WxPay", DateTime.Now.ToString("yyyyMMddHHmmssfff"), ran.Next(999));
                    //插入订单
                    //PayMoney = 1;
                    int result = WhzPaymentBll.AddOrderInfo(orderId, int.Parse(UserID), PayMoney, "", agentId);
                    if (result == 1)
                    {
                        string url = "/WhzPay/JsApiPay?openid=" + OpenID + "&total_fee=" + (PayMoney * 100) + "&orderId=" + orderId;
                        Response.Redirect(url, true);
                    }
                    else
                    {
                        code = "-3";
                    }
                }
                else
                {
                    code = "-2";
                }
            }
            ViewBag.Code = code;
            return View();
        }

        /// <summary>
        /// JSAPI页面
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="total_fee"></param>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public ActionResult JsApiPay(string openid = "", int total_fee = 0, string orderId = "")
        {
            //若传递了相关参数，则调统一下单接口，获得后续相关接口的入口参数
            JsApiPay jsApiPay = new JsApiPay(System.Web.HttpContext.Current);
            jsApiPay.openid = openid;
            jsApiPay.total_fee = total_fee;

            string appId = "";
            string nonceStr = "";
            string package = "";
            string paySign = "";
            string signType = "";
            string timeStamp = "";
            //JSAPI支付预处理
            try
            {
                string productDesc = "游戏房卡";
                string attach = orderId;
                string productTag = "";
                string notifyUrl = "http://csy.laiwan888.cn/WhzPay/PayResultNotify";

                WxPayData unifiedOrderResult = jsApiPay.GetUnifiedOrderResult(productDesc, attach, orderId, productTag, notifyUrl);

                 string wxJsApiParam = jsApiPay.GetJsApiParameters();//获取H5调起JS API参数  
                 JsonData jd = JsonMapper.ToObject(wxJsApiParam);

                appId = (string)jd["appId"];
                nonceStr = (string)jd["nonceStr"];
                package = (string)jd["package"];
                paySign = (string)jd["paySign"];
                signType = (string)jd["signType"];
                timeStamp = (string)jd["timeStamp"];
                
            }
            catch (Exception ex)
            {
                LogUtils.WriteLogFile("H5调起JS错误："+ex.Message, "JsApiPay");
            }
            ViewData["appId"] = appId;
            ViewData["nonceStr"] = nonceStr;
            ViewData["package"] = package;
            ViewData["paySign"] = paySign;
            ViewData["signType"] = signType;
            ViewData["timeStamp"] = timeStamp;
            return View();
        }

        /// <summary>
        /// 充值回调通知
        /// </summary>
        /// <returns></returns>
        public ActionResult PayResultNotify()
        {
            ResultNotify resultNotify = new ResultNotify(System.Web.HttpContext.Current);
            resultNotify.ProcessNotify();
            return View();
        }
    }
}