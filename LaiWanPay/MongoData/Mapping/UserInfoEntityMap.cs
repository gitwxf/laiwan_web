using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LaiWanEntity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace MongoData.Mapping
{
    public class UserInfoEntityMap : BsonClassMap
    {
        public UserInfoEntityMap() : base(typeof(UserInfoEntity))
        {
            this.Reset();
            this.AutoMap();
            //映射的 Collection 名称
            //默认为类名 即 typeof(Tclass).Name
            this.SetDiscriminator("userinfoentity");
        }
    }
}
