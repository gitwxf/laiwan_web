using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace LaiWanDBUtility
{
    public class LogUtils
    {
        /// <summary>
        /// 抛出异常日志文件
        /// </summary>
        /// <param name="logInfo"></param>
        public static void WriteLogFile(string Infos, string fileNameParam)
        {
            FileStream fs = null;
            try
            {
                string filename;

                //年月日
                string str = System.DateTime.Now.Date.Year.ToString() + "-" + System.DateTime.Now.Date.Month.ToString() + "-" + System.DateTime.Now.Date.Day.ToString();
                filename = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\" + str + fileNameParam + ".log";
                //如果不存在该目录就创建该目录
                if (!Directory.Exists(AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\"))
                {

                    Directory.CreateDirectory(AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\");
                }

                //如果该文件存在则往里面写日志
                if (File.Exists(filename))
                {
                    fs = new FileStream(filename, FileMode.Open, FileAccess.Write);
                }
                else
                {
                    fs = new FileStream(filename, FileMode.Create, FileAccess.Write);
                }

                byte[] Bt;
                string curLine;

                //时分秒+日志信息
                curLine = "\r\n" + DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second + " " + Infos;

                Bt = new byte[curLine.Length * 2];
                Bt = Encoding.Default.GetBytes(curLine);

                fs.Position = fs.Length;
                fs.Write(Bt, 0, Bt.Length);
                fs.Close();
            }
            catch (Exception)
            {
                if (fs != null)
                {
                    fs.Close();
                }
            }
        }
    }
}
