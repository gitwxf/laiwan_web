using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;
using LaiWanEntity;
using LaiWanInterface;

namespace MongoData
{
    public partial class MongoRepository<T> : IRepository<T> where T : MongoEntity
    {
        private MongoDbHandler<T> MongoDbHandler;

        public MongoRepository()
        {
            this.MongoDbHandler = new MongoDbHandler<T>();
        }

        public virtual void Create(T entity)
        {
            this.MongoDbHandler.Collection.InsertOneAsync(entity);
        }

        public virtual void Delete(string id)
        {
            this.MongoDbHandler.Collection.DeleteOneAsync(x => x.Id == new ObjectId(id));
        }

        public virtual void Update(T entity)
        {
            this.MongoDbHandler.Collection.ReplaceOneAsync(Builders<T>.Filter.Eq(x => x.Id, entity.Id), entity);
        }

        public async virtual Task<T> FindOne(string id)
        {
            var result = await this.MongoDbHandler.Collection.Find(x => x.Id == new ObjectId(id)).ToListAsync();
            return result.FirstOrDefault();
        }

        public IMongoCollection<T> Collection
        {
            get
            {
                return this.MongoDbHandler.Collection;
            }
        }
    }
}
