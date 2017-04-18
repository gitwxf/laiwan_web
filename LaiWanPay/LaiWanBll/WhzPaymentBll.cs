using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LaiWanDBUtility;

namespace LaiWanBll
{
    public class WhzPaymentBll
    {
        /// <summary>
        /// 充值前插入订单
        /// </summary>
        /// <param name="strOrderId">订单ID</param>
        /// <param name="userId">UserID</param>
        /// <param name="payMoney">充值金额</param>
        /// <param name="strRemark">订单备注</param>
        /// <param name="agentId">代理ID</param>
        /// <returns></returns>
        public static int AddOrderInfo(string strOrderId, int userId, int payMoney, string strRemark, int agentId)
        {
            SqlParameter[] p =
            {
                new SqlParameter("@OrdersNo", SqlDbType.NVarChar, 50),
                new SqlParameter("@UserID", SqlDbType.Int),
                new SqlParameter("@PayMoney", SqlDbType.Int),
                new SqlParameter("@Remark", SqlDbType.NVarChar, 200),
                new SqlParameter("@KindID", SqlDbType.Int),
                new SqlParameter("@AgentID", SqlDbType.Int),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOrderId;
            p[1].Value = userId;
            p[2].Value = payMoney;
            p[3].Value = strRemark;
            p[4].Value = 801;
            p[5].Value = agentId;
            p[6].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.ZiPaiDB, CommandType.StoredProcedure, "P_Pay_AddPaymentOrder", p);
            if (p[6].Value != DBNull.Value && p[6].Value.ToString() != "")
            {
                return Convert.ToInt32(p[6].Value);  //RETURN_VALUE=1表示成功的
            }
            return 0; //数据库异常
        }

        /// <summary>
        /// 充值成功后修改订单信息
        /// </summary>
        /// <param name="strOrderId">订单号</param>
        /// <param name="payMoney">充值金额</param>
        /// <param name="strTpOrderId">订单号，此值有担保充值方返回</param>
        public static Tuple<int,int,int> UpdateOrderInfo(string strOrderId, int payMoney, string strTpOrderId)
        {
            SqlParameter[] p =
            {
                new SqlParameter("@OrderID", SqlDbType.NVarChar, 50),
                new SqlParameter("@PayMoney", SqlDbType.Int),
                new SqlParameter("@TpOrders", SqlDbType.NVarChar, 100),
                new SqlParameter("@UserID", SqlDbType.Int),
                new SqlParameter("@RoomScore", SqlDbType.Int),
                new SqlParameter("@RETURN_VALUE", SqlDbType.Int)
            };
            p[0].Value = strOrderId;
            p[1].Value = payMoney;
            p[2].Value = strTpOrderId;
            p[3].Direction = ParameterDirection.Output;
            p[4].Direction = ParameterDirection.Output;
            p[5].Direction = ParameterDirection.ReturnValue;
            SqlHelper.ExecuteNonQuery(WebConfigHelper.ZiPaiDB, CommandType.StoredProcedure, "P_Pay_UpdatePaymentOrder", p);
            int result = -4;  //RETURN_VALUE=1表示成功的
            int userId = 0;
            int roomscore = 0;
            if (p[5].Value != DBNull.Value && p[5].Value.ToString() != "")
            {
                result= Convert.ToInt32(p[5].Value);  
            }
            if (p[3].Value != DBNull.Value && p[3].Value.ToString() != "")
            {
                userId = Convert.ToInt32(p[3].Value);
            }
            if (p[4].Value != DBNull.Value && p[4].Value.ToString() != "")
            {
                roomscore = Convert.ToInt32(p[4].Value);
            }
            return Tuple.Create(result, userId, roomscore);
        }
    }
}
