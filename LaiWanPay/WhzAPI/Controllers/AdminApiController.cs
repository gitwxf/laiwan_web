using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using LaiWanInterface;
using LaiWanEntity;
using MongoDB.Driver;

namespace WhzAPI.Controllers
{
    public class AdminApiController : Controller
    {
        private IUserInfoEntity _userInfoEntity;
        private IBindAgentEntity _bindAgent;
        private IAddGoldFailInfo _addGoldFail;

        public AdminApiController(IUserInfoEntity userInfo, IBindAgentEntity bindAgent, IAddGoldFailInfo addGoldFail)
        {
            _userInfoEntity = userInfo;
            _bindAgent = bindAgent;
            _addGoldFail = addGoldFail;
        }

        /// <summary>
        /// 获取注册玩家数量
        /// </summary>
        /// <returns></returns>
        public async Task<JsonResult> RegisterNums()
        {
            var result = await this._userInfoEntity.GetNumsCount();
            return Json(new { state = 0, count = result });
        }

        /// <summary>
        /// 查询玩家信息
        /// </summary>
        /// <param name="agentid"></param>
        /// <param name="strWhere"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<JsonResult> UserInfoList(int agentid = 0, string strWhere = "", int pageIndex = 1, int pageSize = 10)
        {
            PageUserInfoEntity entity = new PageUserInfoEntity();
            if (agentid < 1000)
            {
                return Json(new { pagetotal = 0, userlist = entity.ListUserInfoEntity });
            }
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }

            ArrayList asList = new ArrayList();
            if (agentid > 1000)
            {
                var bindinfo = await this._bindAgent.FindManyAsync(x => x.agentid == agentid.ToString());
                if (bindinfo != null && bindinfo.Count > 0)
                {
                    foreach (var model in bindinfo)
                    {
                        asList.Add(model.uid);
                    }
                }
                if (asList.Count > 0)
                {
                    string[] arrString = (string[])asList.ToArray(typeof(string));
                    if (string.IsNullOrEmpty(strWhere))
                    {
                        entity = await this._userInfoEntity.FindManyAsyncPage(x => arrString.Contains(x.uid), pageSize, (pageIndex - 1) * pageSize, "gold", SortDirection.Descending);
                    }
                    else
                    {
                        entity = await this._userInfoEntity.FindManyAsyncPage(x => arrString.Contains(x.uid) && (x.uid.Contains(strWhere) || x.name.Contains(strWhere)), pageSize, (pageIndex - 1) * pageSize, "gold", SortDirection.Descending);
                    }
                }
            }
            else
            {
                if (string.IsNullOrEmpty(strWhere))
                {
                    entity = await this._userInfoEntity.FindManyAsyncPage(x => true, pageSize, (pageIndex - 1) * pageSize, "gold", SortDirection.Descending);
                }
                else
                {
                    entity = await this._userInfoEntity.FindManyAsyncPage(x => x.uid.Contains(strWhere) || x.name.Contains(strWhere), pageSize, (pageIndex - 1) * pageSize, "gold", SortDirection.Descending);
                }
            }

            int pagetotal = 0;
            if (entity.TotalCount > 0)
            {
                pagetotal = (int)Math.Ceiling(Convert.ToDecimal(entity.TotalCount) / Convert.ToDecimal(pageSize));
            }
            return Json(new { pagetotal, totalcount = entity.TotalCount, userlist = entity.ListUserInfoEntity });
        }



        /// <summary>
        /// 查询房卡添加失败记录
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<JsonResult> AddGoldFailInfoList(string uid = "", int pageIndex = 1, int pageSize = 10)
        {
            PageAddFailInfo entity = new PageAddFailInfo();

            if (pageIndex < 1)
            {
                pageIndex = 1;
            }

            if (string.IsNullOrEmpty(uid))
            {
                entity = await this._addGoldFail.FindManyAsyncPage(x => x.uid == uid.ToString(), pageSize, (pageIndex - 1) * pageSize, "addDate", SortDirection.Descending);
            }
            else
            {
                entity = await this._addGoldFail.FindManyAsyncPage(x => true, pageSize, (pageIndex - 1) * pageSize, "addDate", SortDirection.Descending);
            }

            int pagetotal = 0;
            if (entity.TotalCount > 0)
            {
                pagetotal = (int)Math.Ceiling(Convert.ToDecimal(entity.TotalCount) / Convert.ToDecimal(pageSize));
            }
            return Json(new { pagetotal, totalcount = entity.TotalCount, datalist = entity.ListAddGoldFailInfoEntity });
        }
    }
}