using LaiWanDBUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaiWanBll
{
    public class AgentEntityBll
    {
        /// <summary>
        /// 根据代理账号查询代理信息
        /// </summary>
        /// <param name="agentName"></param>
        /// <returns></returns>
        public static DataTable GetAgentsInfoTable(string agentName)
        {
            string strSql = string.Format("SELECT * FROM dbo.wap_admin WITH(NOLOCK) WHERE name = '{0}'; ", agentName);
            try
            {
                return SqlHelper.ExecuteDataTableEx(WebConfigHelper.ZiPaiDB, CommandType.Text, strSql);
            }
            catch (Exception)
            {

            }
            return null;
        }

        /// <summary>
        /// 根据代理ID查询代理信息
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        public static DataTable GetAgentsInfoTable(int agentId)
        {
            string strSql = string.Format("SELECT * FROM dbo.wap_admin WITH(NOLOCK) WHERE id = {0}; ", agentId);
            try
            {
                return SqlHelper.ExecuteDataTableEx(WebConfigHelper.ZiPaiDB, CommandType.Text, strSql);
            }
            catch (Exception)
            {

            }
            return null;
        }
    }
}
