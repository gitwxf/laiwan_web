using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using LaiWanInterface;

namespace LaiWanPayMvc.Controllers
{
    public class AdminApiController : Controller
    {
        private IUserInfoEntity _userInfoEntity;

        public AdminApiController(IUserInfoEntity userInfo)
        {
            _userInfoEntity = userInfo;
        }

        /// <summary>
        /// 获取注册玩家数量
        /// </summary>
        /// <returns></returns>
        public async Task<JsonResult> RegisterNums()
        {
            var result = await this._userInfoEntity.GetNumsCount();
            return Json(new {state = 0, count = result});
        }
    }
}