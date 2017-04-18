using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using LaiWanInterface;
using LaiWanEntity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LaiWanService
{
    public class UserInfoEntityService : IUserInfoEntity
    {
        private readonly IRepository<UserInfoEntity> _userRepository;

        public UserInfoEntityService(IRepository<UserInfoEntity> userRepository)
        {
            this._userRepository = userRepository;
        }

        public async Task<List<UserInfoEntity>> FindManyAsync(Expression<Func<UserInfoEntity, bool>> exp)
        {
            var result = await this._userRepository.Collection.Find(exp).ToListAsync();
            return result;
        }

        public async Task<PageUserInfoEntity> FindManyAsyncPage(Expression<Func<UserInfoEntity, bool>> exp, int limit, int skip, string orderBy, SortDirection orderType)
        {
            var collection = await this._userRepository.Collection.Find(exp).ToListAsync();
            PageUserInfoEntity pageUser = new PageUserInfoEntity { TotalCount = 0};
            if (collection != null)
            {
                SortDefinition<UserInfoEntity> sortBson = (orderType == SortDirection.Ascending)
                    ? Builders<UserInfoEntity>.Sort.Ascending(orderBy)
                    : Builders<UserInfoEntity>.Sort.Descending(orderBy);
                pageUser.TotalCount = collection.Count;
                pageUser.ListUserInfoEntity =
                    await this._userRepository.Collection.Find(exp).Sort(sortBson).Limit(limit).Skip(skip).ToListAsync();
            }
            return pageUser;
        }

        public async Task<UserInfoEntity> FindOneAsync(string id)
        {
            var result = await this._userRepository.FindOne(id);
            return result;
        }

        public void CreateUser(UserInfoEntity entity)
        {
            this._userRepository.Create(entity);
        }


        public void UpdateUser(UserInfoEntity entity)
        {
            this._userRepository.Update(entity);
        }

        public void DeleteUser(string id)
        {
            this._userRepository.Delete(id);
        }

        public async Task<bool> IsUidExists(string uid)
        {
            var result = await this._userRepository.Collection.Find(x => x.uid == uid.Trim()).CountAsync();
            return result != 0;
        }

        public async Task<bool> IsUnionidExists(string unionid)
        {
            var result = await this._userRepository.Collection.Find(x => x.unionid == unionid.Trim()).CountAsync();
            return result != 0;
        }

        public async Task<long> GetNumsCount()
        {
           var result=await this._userRepository.Collection.CountAsync(new BsonDocument());
            return result;
        }
    }
}
