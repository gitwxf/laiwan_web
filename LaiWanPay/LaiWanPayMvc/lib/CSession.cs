using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaiWanPayMvc.lib
{
    public class CSession
    {
        public static object Get(string Key)
        {
            return HttpContext.Current.Session[Key];
        }


        public static string GetString(string Key)
        {
            object obj = HttpContext.Current.Session[Key];
            if (obj == null) return "";
            else return obj.ToString();
        }


        public static object Get(string Key, object DefaultValue)
        {
            if (HttpContext.Current.Session[Key] == null)

                return DefaultValue;
            else
                return HttpContext.Current.Session[Key];

        }


        public static object Get(string Key, object DefaultValue, Boolean CanAdd)
        {
            if (HttpContext.Current.Session[Key] == null)
            {
                if (CanAdd == true)
                    HttpContext.Current.Session.Add(Key, DefaultValue);
                return DefaultValue;
            }
            else
                return HttpContext.Current.Session[Key];
        }


        public static bool Set(string Key, object Value)
        {
            try
            {
                HttpContext.Current.Session[Key] = Value;   
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static void RemoveSession(string Key)
        {
            HttpContext.Current.Session[Key] = null;
        }
    }
}