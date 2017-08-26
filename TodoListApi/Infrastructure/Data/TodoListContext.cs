using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using TodoList.Api.Models;

namespace TodoList.Api.Infrastructure.Data
{
    /// <summary>
    /// Db context
    /// </summary>
    public class TodoListContext : DbContext
    {
        /// <summary>
        /// Db context Constructor
        /// </summary>
        public TodoListContext():base("name=TodoListContext")
        {

        }

        /// <summary>
        /// List of users
        /// </summary>
        public DbSet<AppUser> AppUsers { get; set; }
        /// <summary>
        /// Todo List
        /// </summary>
        public DbSet<Todo> Todoes { get; set; }
    }
}