using LaiWanBll;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WhzAPI.Controllers
{
    public class GameApiController : Controller
    {
        /// <summary>
        /// 验证邀请码ID
        /// </summary>
        /// <param name="agentid"></param>
        /// <returns></returns>
        public JsonResult AgentValidate(string agentid = "")
        {
            int agent;
            int.TryParse(agentid, out agent);
            if (agent <= 1000)
            {
                return Json(new { state = -1, agentname = "" }, JsonRequestBehavior.AllowGet);  //邀请码不正确
            }
            DataTable dt = dt = AgentEntityBll.GetAgentsInfoTable(agent);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Json(new { state = 0, agentname = dt.Rows[0]["name"].ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { state = -2, agentname = "" }, JsonRequestBehavior.AllowGet);  //邀请码不存在
        }
    }
}