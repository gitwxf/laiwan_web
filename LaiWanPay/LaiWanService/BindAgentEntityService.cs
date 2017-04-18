using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using LaiWanEntity;
using LaiWanInterface;
using MongoDB.Driver;

namespace LaiWanService
{
    public class BindAgentEntityService: IBindAgentEntity
    {
        private readonly IRepository<BindAgentEntity> _bindAgentRepository;

        public BindAgentEntityService(IRepository<BindAgentEntity> bindAgentRepository)
        {
            this._bindAgentRepository = bindAgentRepository;
        }

        public async Task<List<BindAgentEntity>> FindManyAsync(Expression<Func<BindAgentEntity, bool>> exp)
        {
            var result = await this._bindAgentRepository.Collection.Find(exp).ToListAsync();
            return result;
        }

        public async Task<PageBindAgentEntity> FindManyAsyncPage(Expression<Func<BindAgentEntity, bool>> exp, int limit, int skip, string orderBy, SortDirection orderType)
        {
            var collection = await this._bindAgentRepository.Collection.Find(exp).ToListAsync();
            PageBindAgentEntity bindAgent = new PageBindAgentEntity { TotalCount = 0 };
            if (collection != null)
            {
                SortDefinition<BindAgentEntity> sortBson = (orderType == SortDirection.Ascending)
                    ? Builders<BindAgentEntity>.Sort.Ascending(orderBy)
                    : Builders<BindAgentEntity>.Sort.Descending(orderBy);
                bindAgent.TotalCount = collection.Count;
                bindAgent.ListBindAgentEntity =await this._bindAgentRepository.Collection.Find(exp).Sort(sortBson).Limit(limit).Skip(skip).ToListAsync();
            }
            return bindAgent;
        }

        public async Task<BindAgentEntity> FindOneAsync(string id)
        {
            var result = await this._bindAgentRepository.FindOne(id);
            return result;
        }

        public void CreateUser(BindAgentEntity entity)
        {
            this._bindAgentRepository.Create(entity);
        }


        public void UpdateUser(BindAgentEntity entity)
        {
            this._bindAgentRepository.Update(entity);
        }

        public void DeleteUser(string id)
        {
            this._bindAgentRepository.Delete(id);
        }

        public async Task<bool> IsUidExists(string uid)
        {
            var result = await this._bindAgentRepository.Collection.Find(x => x.uid == uid.Trim()).CountAsync();
            return result != 0;
        }
    }
}
