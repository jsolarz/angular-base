using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using TodoList.Api.Infrastructure.Data;
using TodoList.Api.Models;

namespace TodoList.Api.Infrastructure.Authentication
{
    /// <summary>
    /// 
    /// </summary>
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var uri = context.Request.Uri;
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "http://localhost:54972" });
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Credentials", new[] { "true" });

            IdentityUser user = null;

            using (AuthRepository _repo = new AuthRepository())
            {
                user = await _repo.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
            }

            AppUser userData = null;
            using (TodoListContext db = new TodoListContext())
            {
                userData = db.AppUsers.FirstOrDefault(x => x.Email.Equals(context.UserName));
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Email, context.UserName));
            identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, userData.ID.ToString()));

            context.Validated(identity);

        }
    }
}