using Elmah.Contrib.WebApi;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Routing;
using TodoList.Api.Models;

namespace TodoList.Api
{
    /// <summary>
    /// Web API config file
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Register WebApiConfig
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            // Web Api configuration and services
            // enable elmah
            config.Services.Add(typeof(IExceptionLogger), new ElmahExceptionLogger());

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute("AXD", "{resource}.axd/{*pathInfo}", null, null, new StopRoutingHandler());

            //var cors = new EnableCorsAttribute("http://localhost:54972", "*", "*");
            //config.EnableCors(cors);            
        }
    }
}
