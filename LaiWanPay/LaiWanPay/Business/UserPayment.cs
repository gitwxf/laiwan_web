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
    public class UserPayment
    {
        /// <summary>
        /// 查询玩家信息
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static DataTable GetUserInfoTable(int userId)
        {
            string strSql = string.Format("SELECT * FROM dbo.View_GameList WITH(NOLOCK) WHERE GameID = {0}; ", userId);
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
        /// 查询玩家信息
        /// </summary>
        /// <param name="agentsId"></param>
        /// <returns></returns>
        public static DataTable GetUserInfoTable(string openId)
        {
            string strSql = string.Format("SELECT * FROM dbo.UserBindWeiXinList WITH(NOLOCK) WHERE OpenId = '{0}'; ", openId);
            try
            {
                return SqlHelper.ExecuteDataTableEx(WebConfigHelper.UserInfoDB, CommandType.Text, strSql);
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
        /// <param name="userId">UserID</param>
        /// <param name="payMoney">充值金额</param>
        /// <param name="strRemark">订单备注</param>
        /// <returns></returns>
        public static int AddOrderInfo(string strOrderId, int userId, int payMoney, string strRemark)
        {            
            SqlParameter[] p =
            {
                new SqlParameter("@OrdersNo", SqlDbType.NVarChar, 50),
                new SqlParameter("@UserID", SqlDbType.Int),
                new SqlParameter("@PayMoney", SqlDbType.Int),
                new SqlParameter("@Remark", SqlDbType.NVarChar, 200),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOrderId;
            p[1].Value = userId;
            p[2].Value = payMoney;
            p[3].Value = strRemark;
            p[4].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.UserInfoDB, CommandType.StoredProcedure, "GSP_PAY_AddPaymentOrder", p);
            if (p[4].Value != DBNull.Value && p[4].Value.ToString() != "")
            {
                return Convert.ToInt32(p[4].Value);  //RETURN_VALUE=1表示成功的
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
            SqlHelper.ExecuteNonQuery(WebConfigHelper.UserInfoDB, CommandType.StoredProcedure, "GSP_PAY_UpdatePaymentOrder", p);
            if (p[3].Value != DBNull.Value && p[3].Value.ToString() != "")
            {
                return Convert.ToInt32(p[3].Value);  //RETURN_VALUE=1表示成功的
            }
            return -4; //数据库异常
        }



        /// <summary>
        /// 玩家绑定信息
        /// </summary>
        /// <param name="strOpenId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static int AddUserBindWxInfo(string strOpenId, int userId)
        {
            SqlParameter[] p =
            {
                new SqlParameter("@OpenID", SqlDbType.VarChar, 50),
                new SqlParameter("@UserID", SqlDbType.Int),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOpenId;
            p[1].Value = userId;
            p[2].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.UserInfoDB, CommandType.StoredProcedure, "GSP_PAY_AddUserBindWxInfo", p);
            if (p[2].Value != DBNull.Value && p[2].Value.ToString() != "")
            {
                return Convert.ToInt32(p[2].Value);  //RETURN_VALUE=1表示成功的
            }
            return -5; //数据库异常
        }
    }
}