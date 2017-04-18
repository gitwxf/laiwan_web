using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace LaiWanDBUtility
{
    public class LogUtils
    {
        /// <summary>
        /// �׳��쳣��־�ļ�
        /// </summary>
        /// <param name="logInfo"></param>
        public static void WriteLogFile(string Infos, string fileNameParam)
        {
            FileStream fs = null;
            try
            {
                string filename;

                //������
                string str = System.DateTime.Now.Date.Year.ToString() + "-" + System.DateTime.Now.Date.Month.ToString() + "-" + System.DateTime.Now.Date.Day.ToString();
                filename = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\" + str + fileNameParam + ".log";
                //��������ڸ�Ŀ¼�ʹ�����Ŀ¼
                if (!Directory.Exists(AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\"))
                {

                    Directory.CreateDirectory(AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\");
                }

                //������ļ�������������д��־
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

                //ʱ����+��־��Ϣ
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
