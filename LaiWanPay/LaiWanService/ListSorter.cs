using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LaiWanEntity;
using MongoDB.Driver;

namespace LaiWanService
{
    public static class ListSorter
    {
        public static List<T> SortList<T>(this List<T> listSource, List<string> sortExpression, List<SortDirection> sortDirection)
        {
            //check parameters           
            if (sortExpression.Count != sortDirection.Count || sortExpression.Count == 0 || sortDirection.Count == 0)
            {
                throw new Exception("Invalid sort arguments!");
            }
            //get myComparer
            Comparer<T> myComparer = new Comparer<T>();
            for (int i = 0; i < sortExpression.Count; i++)
            {
                SortClass sortClass = new SortClass(sortExpression[i], sortDirection[i]);
                myComparer.SortClasses.Add(sortClass);
            }
            listSource.Sort(myComparer);
            return listSource;
        }

        public static List<T> SortList<T>(this List<T> listSource, string sortExpression, SortDirection sortDirection)
        {
            //check parameters
            if (sortExpression == null || sortExpression == string.Empty || sortDirection == null)
            {
                return listSource;
            }
            Comparer<T> myComparer = new Comparer<T>();
            myComparer.SortClasses.Add(new SortClass(sortExpression, sortDirection));
            listSource.Sort(myComparer);
            return listSource;
        }
    }
}
