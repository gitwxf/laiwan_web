using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace LaiWanEntity
{
    public class SortClass
    {
        public string SortProperty { get; set; }
        /// <summary>
        /// 排序类型ASC,DESC
        /// </summary>
        public SortDirection SortType { get; set; }

        public SortClass(string sortProperty, SortDirection sortType)
        {
            this.SortProperty = sortProperty;
            this.SortType = sortType;
        }
    }
}
