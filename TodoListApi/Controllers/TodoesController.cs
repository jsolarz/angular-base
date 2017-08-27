using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TodoList.Api.Infrastructure.Data;
using TodoList.Api.Models;

namespace TodoList.Api.Controllers
{
    /// <summary>
    /// Todo list controller
    /// </summary>    
    [Authorize]
    public class TodoesController : ApiController
    {
        private TodoListContext db = new TodoListContext();

        /// <summary>
        /// Get a todo list
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/Todoes
        public IEnumerable<Todo> GetTodoes()
        {
            try
            {
                ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
                //getting the user id from the authenticated user
                var userId = int.Parse(principal.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Single().Value);

                return db.Todoes.Include(x => x.User).Where(x => x.UserId == userId).ToList();
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get a specific todo item
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/Todoes/5
        [ResponseType(typeof(Todo))]
        public async Task<IHttpActionResult> GetTodo(int id)
        {
            Todo todo = await db.Todoes.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        /// <summary>
        /// Add or update a todo item
        /// </summary>
        /// <param name="id"></param>
        /// <param name="todo"></param>
        /// <returns></returns>
        // PUT: api/Todoes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTodo(int id, Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todo.ID)
            {
                return BadRequest();
            }

            db.Entry(todo).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Todoes
        /// <summary>
        /// Adds a new todo item
        /// </summary>
        /// <param name="todo"></param>
        /// <returns></returns>
        [ResponseType(typeof(Todo))]
        public async Task<IHttpActionResult> PostTodo(Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
                //getting the user id from the authenticated user
                var userId = int.Parse(principal.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Single().Value);
                todo.UserId = userId;

                db.Todoes.Add(todo);
                await db.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                return InternalServerError(ex);
            }

            return CreatedAtRoute("DefaultApi", new { id = todo.ID }, todo);
        }

        // DELETE: api/Todoes/5
        /// <summary>
        /// Deletes a todo item
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(Todo))]
        public async Task<IHttpActionResult> DeleteTodo(int id)
        {
            Todo todo = await db.Todoes.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            db.Todoes.Remove(todo);
            await db.SaveChangesAsync();

            return Ok(todo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TodoExists(int id)
        {
            return db.Todoes.Count(e => e.ID == id) > 0;
        }
    }
}