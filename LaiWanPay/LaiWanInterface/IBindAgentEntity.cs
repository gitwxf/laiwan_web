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
    public interface IBindAgentEntity
    {
        Task<List<BindAgentEntity>> FindManyAsync(Expression<Func<BindAgentEntity, bool>> exp);
        Task<PageBindAgentEntity> FindManyAsyncPage(Expression<Func<BindAgentEntity, bool>> exp, int limit, int skip, string orderBy, SortDirection orderType);
        Task<BindAgentEntity> FindOneAsync(string id);
        void CreateUser(BindAgentEntity entity);
        void UpdateUser(BindAgentEntity entity);
        void DeleteUser(string id);
        Task<bool> IsUidExists(string uid);
    }
}
