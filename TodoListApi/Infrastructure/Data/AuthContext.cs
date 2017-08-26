using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoList.Api.Infrastructure.Data
{
    /// <summary>
    /// 
    /// </summary>
    public class AuthContext : IdentityDbContext<IdentityUser>
    {
        /// <summary>
        /// 
        /// </summary>
        public AuthContext()
            : base("AuthContext")
        {

        }
    }
}