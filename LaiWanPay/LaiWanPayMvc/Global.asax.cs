using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using LaiWanInterface;
using Autofac;
using Autofac.Integration.Mvc;
using MongoData;
using LaiWanService;

namespace LaiWanPayMvc
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            #region 注入依赖
            //获取容器建立者
            var builder = new ContainerBuilder();
            //注册泛型 Repository<>
            builder.RegisterGeneric(typeof(MongoRepository<>)).As(typeof(IRepository<>)).InstancePerLifetimeScope();
            //注册 Service
            builder.RegisterType(typeof(UserInfoEntityService)).As(typeof(IUserInfoEntity));
            builder.RegisterType(typeof(BindAgentEntityService)).As(typeof(IBindAgentEntity));
            //注册 Controller 
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            //创建容器
            var container = builder.Build();
            //将上面的容器设置为一个新的依赖解析器
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            #endregion
        }
    }
}
