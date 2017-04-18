using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Linq;
using LaiWanEntity;
using System.Web.Configuration;

namespace MongoData
{
    public class MongoDbHandler<T> where T : MongoEntity
    {
        private string connectionString = WebConfigurationManager.ConnectionStrings["mongo"].ConnectionString;
        private string databaseName = WebConfigurationManager.AppSettings["mongodb"];
        public IMongoCollection<T> Collection { get; private set; }
        public MongoDbHandler()
        {
            var mongoClient = new MongoClient(connectionString);
            var mongoDb = mongoClient.GetDatabase(databaseName);

            //获取当前模型的映射类
            //获取当前类的 Discriminator 即集合名称
            var registerClass = BsonClassMap.GetRegisteredClassMaps()
                .SingleOrDefault(x => x.ClassType == typeof(T));

            if (registerClass != null)
                this.Collection = mongoDb.GetCollection<T>(registerClass.Discriminator);
            else
                throw new ArgumentNullException();
        }
    }
}
