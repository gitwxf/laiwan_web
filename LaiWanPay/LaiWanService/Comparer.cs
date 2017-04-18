using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LaiWanEntity;
using MongoDB.Driver;

namespace LaiWanService
{
    /// <summary>
    /// Implementation of IComparer
    /// </summary>
    public class Comparer<T> : IComparer<T>
    {
        private readonly List<SortClass> _sortClasses;

        /// <summary>
        /// Collection of sorting criteria
        /// </summary>
        public List<SortClass> SortClasses
        {
            get { return _sortClasses; }
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public Comparer()
        {
            _sortClasses = new List<SortClass>();
        }

        /// <summary>
        /// Constructor that takes a sorting class collection as param
        /// </summary>
        /// <param name="sortClass">
        /// Collection of sorting criteria 
        ///</param>
        public Comparer(List<SortClass> sortClass)
        {
            _sortClasses = sortClass;
        }

        /// <summary>
        /// Constructor 
        /// </summary>
        /// <param name="sortProperty">Property to sort on</param>
        /// <param name="sortType">Direction to sort</param>
        public Comparer(string sortProperty, SortDirection sortType)
        {
            _sortClasses = new List<SortClass>();
            _sortClasses.Add(new SortClass(sortProperty, sortType));
        }

        /// <summary>
        /// Implementation of IComparer interface to compare to object
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public int Compare(T x, T y)
        {
            if (SortClasses.Count == 0)
            {
                return 0;
            }
            return CheckSort(0, x, y);
        }

        /// <summary>
        /// Recursive function to do sorting
        /// </summary>
        /// <param name="sortLevel">Current level sorting at</param>
        /// <param name="myObject1"></param>
        /// <param name="myObject2"></param>
        /// <returns></returns>
        private int CheckSort(int sortLevel, T myObject1, T myObject2)
        {
            int returnVal = 0;
            if (SortClasses.Count - 1 >= sortLevel)
            {
                object valueOf1 = myObject1.GetType().GetProperty(SortClasses[sortLevel].SortProperty).GetValue(myObject1, null);
                object valueOf2 = myObject2.GetType().GetProperty(SortClasses[sortLevel].SortProperty).GetValue(myObject2, null);
                if (SortClasses[sortLevel].SortType == SortDirection.Ascending)
                {
                    returnVal = ((IComparable)valueOf1).CompareTo((IComparable)valueOf2);
                }
                else
                {
                    returnVal = ((IComparable)valueOf2).CompareTo((IComparable)valueOf1);
                }
                if (returnVal == 0)
                {
                    returnVal = CheckSort(sortLevel + 1, myObject1, myObject2);
                }
            }
            return returnVal;
        }
    }
}
