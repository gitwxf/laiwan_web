using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LaiWanEntity;
using MongoDB.Bson.Serialization;

namespace MongoData.Mapping
{
    public class BindAgentEntityMap : BsonClassMap
    {
        public BindAgentEntityMap() : base(typeof(BindAgentEntity))
        {
            this.Reset();
            this.AutoMap();
            //映射的 Collection 名称
            //默认为类名 即 typeof(Tclass).Name
            this.SetDiscriminator("bindagententity");
        }
    }
}
