using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using LaiWanEntity;
using LaiWanInterface;
using MongoDB.Driver;

namespace LaiWanPayMvc.Controllers
{
    public class TestController : Controller
    {
        private IUserInfoEntity _userInfoEntity;
        public TestController(IUserInfoEntity userInfo)
        {
            _userInfoEntity = userInfo;
        }


        public async Task<ActionResult> Index()
        {
            var userinfo = await this._userInfoEntity.FindManyAsync(x => x.name=="安静。");
             var userinfopage = await this._userInfoEntity.FindManyAsyncPage(x => true, 2, 2, "uid", SortDirection.Ascending);
            return View(userinfo);
        }
    }
}