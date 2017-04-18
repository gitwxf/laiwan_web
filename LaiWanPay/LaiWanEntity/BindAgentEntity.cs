using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaiWanEntity
{
    public class BindAgentEntity : MongoEntity
    {
        /// <summary>
        /// uid，随机生user标识
        /// </summary>
        public string uid { get; set; }
        public int agentid { get; set; }
        public string agentname { get; set; }
        public string addtime { get; set; }
    }
}
