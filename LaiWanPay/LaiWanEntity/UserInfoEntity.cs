using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaiWanEntity
{
    public class UserInfoEntity : MongoEntity
    {
        /// <summary>
        /// uid，随机生user标识
        /// </summary>
        public string uid { get; set; }
        public string account { get; set; }
        public string pwd { get; set; }
        public int gold { get; set; }
        public int diamond { get; set; }
        public string name { get; set; }
        public string headUrl { get; set; }
        public int score { get; set; }
        public string regDate { get; set; }
        public string loginDate { get; set; }
        public int? sex { get; set; }
        public int accountState { get; set; }
        public string unionid { get; set; }
    }
}
