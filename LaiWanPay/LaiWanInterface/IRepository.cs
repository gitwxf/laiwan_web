using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using LaiWanEntity;

namespace LaiWanInterface
{
    public interface IRepository<T> where T : MongoEntity
    {
        void Create(T entity);
        void Delete(string id);
        void Update(T entity);
        Task<T> FindOne(string id);
        IMongoCollection<T> Collection { get; }
    }
}
