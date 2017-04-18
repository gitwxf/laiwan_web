using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LaiWanInterface;
using LaiWanEntity;

namespace LaiWanBll
{
    public class UserInfoEntityBll
    {
        private readonly IUserInfoEntity UserInfoEntity;

        public async Task<List<UserInfoEntity>> FindManyAsync()
        {
            var result = await this.UserInfoEntity.FindManyAsync(x => true);
            return result;
        }
    }
}
