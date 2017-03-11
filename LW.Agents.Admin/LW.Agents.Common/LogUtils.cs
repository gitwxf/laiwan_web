using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace LW.Agents.Common
{
    public class LogUtils
    {
        /// <summary>
        /// �ı���־
        /// </summary>
        /// <param name="strInfo"></param>
        /// <param name="strFileName"></param>
        public static void WriteLogFile(string strInfo, string strFileName)
        {
            FileStream fs = null;
            try
            {
                string filename;
                //������
                string str = DateTime.Now.ToString("yyyy-MM-dd");
                filename = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\" + str + strFileName + ".log";
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
                curLine = "\r\n" + DateTime.Now.ToString("HH:mm:ss tt zz") + " " + strInfo;
                
                Bt = Encoding.UTF8.GetBytes(curLine);

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
