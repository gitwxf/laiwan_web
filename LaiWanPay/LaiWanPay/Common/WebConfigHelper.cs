﻿using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace LaiWanPay.Common
{
    /// <summary>
    /// webconfig帮助类
    /// </summary>
    public class WebConfigHelper
    {
        /// <summary>
        /// ConnectionStrings配置
        /// </summary>
        private static readonly ConnectionStringSettingsCollection ConnectionStringsCon = WebConfigurationManager.ConnectionStrings;

        /// <summary>
        /// AppSettings配置
        /// </summary>
        private static readonly NameValueCollection AppSettingsCon = WebConfigurationManager.AppSettings;



        /// <summary>
        /// 代理后台数据库
        /// </summary>
        public static string AgentAdminDB
        {
            get { return ConnectionStringsCon["xjpgameweb"].ConnectionString; }
        }

        /// <summary>
        /// UserInfo
        /// </summary>
        public static string UserInfoDB
        {
            get { return ConnectionStringsCon["xjpaccountsdb"].ConnectionString; }
        }
    }
}