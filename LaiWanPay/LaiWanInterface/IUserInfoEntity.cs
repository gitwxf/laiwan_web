using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using LaiWanEntity;
using MongoDB.Driver;

namespace LaiWanInterface
{
    public interface IUserInfoEntity
    {
        Task<List<UserInfoEntity>> FindManyAsync(Expression<Func<UserInfoEntity, bool>> exp);
        Task<PageUserInfoEntity> FindManyAsyncPage(Expression<Func<UserInfoEntity, bool>> exp, int limit, int skip,string orderBy, SortDirection orderType);
        Task<UserInfoEntity> FindOneAsync(string id);
        void CreateUser(UserInfoEntity entity);
        void UpdateUser(UserInfoEntity entity);
        void DeleteUser(string id);
        Task<bool> IsUidExists(string uid);
        Task<bool> IsUnionidExists(string unionid);
        Task<long> GetNumsCount();
    }
}
