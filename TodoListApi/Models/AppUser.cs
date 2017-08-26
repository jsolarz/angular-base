using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoList.Api.Models
{
    public class AppUser
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<Todo> Todos { get; set; }
    }
}