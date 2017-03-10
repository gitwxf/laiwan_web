using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using LaiWanPay.Common;
using LaiWanPay.DBUtility;

namespace LaiWanPay.Business
{
    public class AgentsPayment
    {
        /// <summary>
        /// 查询代理信息
        /// </summary>
        /// <param name="agentsId"></param>
        /// <returns></returns>
        public static DataTable GetAgentsInfoTable(int agentsId)
        {
            string strSql = string.Format("SELECT * FROM dbo.AgentsList WITH(NOLOCK) WHERE AgentsID = {0}; ", agentsId);
            try
            {
                return SqlHelper.ExecuteDataTableEx(WebConfigHelper.AgentAdminDB, CommandType.Text, strSql);
            }
            catch (Exception)
            {

            }
            return null;
        }

        /// <summary>
        /// 查询代理信息
        /// </summary>
        /// <param name="agentsId"></param>
        /// <returns></returns>
        public static DataTable GetAgentsInfoTable(string openId)
        {
            string strSql = string.Format("SELECT * FROM dbo.AgentsBindWeiXinList WITH(NOLOCK) WHERE OpenId = '{0}'; ", openId);
            try
            {
                return SqlHelper.ExecuteDataTableEx(WebConfigHelper.AgentAdminDB, CommandType.Text, strSql);
            }
            catch (Exception)
            {

            }
            return null;
        }
        

        /// <summary>
        /// 充值前插入订单
        /// </summary>
        /// <param name="strOrderId">订单ID</param>
        /// <param name="agentsId">代理ID</param>
        /// <param name="payMoney">充值金额</param>
        /// <param name="strRemark">订单备注</param>
        /// <param name="kindId">游戏类别</param>
        /// <returns></returns>
        public static int AddOrderInfo(string strOrderId, int agentsId, int payMoney, string strRemark, int kindId)
        {
            //LogUtils.WriteLogFile("strOrderId:"+ strOrderId+ ",agentsId="+ agentsId + ",payMoney=" + payMoney + ",strRemark=" + strRemark + ",kindId=" + kindId,"sssss");
            SqlParameter[] p =
            {
                new SqlParameter("@OrdersNo", SqlDbType.NVarChar, 50),
                new SqlParameter("@AgentsID", SqlDbType.Int),
                new SqlParameter("@PayMoney", SqlDbType.Int),
                new SqlParameter("@Remark", SqlDbType.NVarChar, 200),
                new SqlParameter("@KindID", SqlDbType.Int),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOrderId;
            p[1].Value = agentsId;
            p[2].Value = payMoney;
            p[3].Value = strRemark;
            p[4].Value = kindId;
            p[5].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.AgentAdminDB, CommandType.StoredProcedure, "XL_MB_AddPaymentOrder_17_02_25", p);
            if (p[5].Value != DBNull.Value && p[5].Value.ToString() != "")
            {
                return Convert.ToInt32(p[5].Value);  //RETURN_VALUE=1表示成功的
            }
            return 0; //数据库异常
        }

        /// <summary>
        /// 充值成功后修改订单信息
        /// </summary>
        /// <param name="strOrderId">订单号</param>
        /// <param name="payMoney">充值金额</param>
        /// <param name="strTpOrderId">订单号，此值有担保充值方返回</param>
        public static int UpdateOrderInfo(string strOrderId, int payMoney, string strTpOrderId)
        {
            SqlParameter[] p =
            {
                new SqlParameter("@OrderID", SqlDbType.NVarChar, 50),
                new SqlParameter("@PayMoney", SqlDbType.Int),
                new SqlParameter("@TpOrders", SqlDbType.NVarChar, 100),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOrderId;
            p[1].Value = payMoney;
            p[2].Value = strTpOrderId;
            p[3].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.AgentAdminDB, CommandType.StoredProcedure, "XL_MB_UpdatePaymentOrder_17_02_25", p);
            if (p[3].Value != DBNull.Value && p[3].Value.ToString() != "")
            {
                return Convert.ToInt32(p[3].Value);  //RETURN_VALUE=1表示成功的
            }
            return -4; //数据库异常
        }


        /// <summary>
        /// 代理绑定信息
        /// </summary>
        /// <param name="strOpenId"></param>
        /// <param name="agentsId"></param>
        /// <param name="kindId"></param>
        /// <returns></returns>
        public static int AddAgentsBindWxInfo(string strOpenId, int agentsId, int kindId)
        {
            SqlParameter[] p =
            {
                new SqlParameter("@OpenID", SqlDbType.VarChar, 50),
                new SqlParameter("@AgentsID", SqlDbType.Int),
                new SqlParameter("@KindID", SqlDbType.Int),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOpenId;
            p[1].Value = agentsId;
            p[2].Value = kindId;
            p[3].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.AgentAdminDB, CommandType.StoredProcedure, "XL_MB_AddAgentsBindWxInfo_17_02_27", p);
            if (p[3].Value != DBNull.Value && p[3].Value.ToString() != "")
            {
                return Convert.ToInt32(p[3].Value);  //RETURN_VALUE=1表示成功的
            }
            return 0; //数据库异常
        }


        /// <summary>
        /// 代理绑定信息
        /// </summary>
        /// <param name="strOpenId"></param>
        /// <param name="agentsName"></param>
        /// <param name="agentsPass"></param>
        /// <returns></returns>
        public static int AddAgentsBindWxInfo(string strOpenId, string agentsName, string agentsPass)
        {
            SqlParameter[] p =
            {
                new SqlParameter("@OpenID", SqlDbType.VarChar, 50),
                new SqlParameter("@AgentsName", SqlDbType.NVarChar,50),
                new SqlParameter("@AgentsPass", SqlDbType.NVarChar,50),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOpenId;
            p[1].Value = agentsName;
            p[2].Value = agentsPass;
            p[3].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.AgentAdminDB, CommandType.StoredProcedure, "XL_MB_AddAgentsBindWxInfo_17_02_28", p);
            if (p[3].Value != DBNull.Value && p[3].Value.ToString() != "")
            {
                return Convert.ToInt32(p[3].Value);  //RETURN_VALUE=1表示成功的
            }
            return -5; //数据库异常
        }
    }
}