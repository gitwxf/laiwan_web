using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using AutoMapper;

namespace LaiWanPayMvc.Infrastructure
{
    public class AutoMapperStartupTask
    {
        public static void Execute()
        {
            //ObjectId --> string
            Mapper.CreateMap<ObjectId, string>().ConvertUsing((ObjectId source) =>
            {
                if (source != null)
                {
                    return source.ToString();
                }
                return string.Empty;
            });
            //string --> ObjectId
            Mapper.CreateMap<string, ObjectId>().ConvertUsing((string source) =>
            {
                var objId = ObjectId.Empty;
                if (ObjectId.TryParse(source, out objId))
                {
                    return objId;
                }
                return ObjectId.Empty;
            });
        }
    }
}