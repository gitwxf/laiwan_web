using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace LaiWanPayMvc.Business
{
    public class HttpFunc
    {
        /// <summary>
        /// Post数据
        /// </summary>
        /// <param name="strUrl"></param>
        /// <param name="postDataStr"></param>
        /// <returns></returns>
        public static string HttpPost(string strUrl, string postDataStr)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(strUrl);
            request.Method = "POST";
            request.ContentType = "application/json;charset=UTF-8";
            request.ContentLength = postDataStr.Length;
            StreamWriter writer = new StreamWriter(request.GetRequestStream(), Encoding.ASCII);
            writer.Write(postDataStr);
            writer.Flush();
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            string encoding = response.ContentEncoding;
            if (encoding == null || encoding.Length < 1)
            {
                encoding = "UTF-8"; //默认编码  
            }
            StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(encoding));
            string retString = reader.ReadToEnd();
            return retString;
        }
    }
}