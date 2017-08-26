using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using TodoList.Api.Infrastructure.Data;
using TodoList.Api.Models;

namespace TodoList.Api.Controllers
{
    public class AppUsersController : ApiController
    {
        private TodoListContext db = new TodoListContext();

        // GET: api/AppUsers
        public IQueryable<AppUser> GetAppUsers()
        {
            return db.AppUsers;
        }

        // GET: api/AppUsers/5
        [ResponseType(typeof(AppUser))]
        public async Task<IHttpActionResult> GetAppUser(int id)
        {
            AppUser appUser = await db.AppUsers.FindAsync(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }

        // PUT: api/AppUsers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAppUser(int id, AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appUser.ID)
            {
                return BadRequest();
            }

            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
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

        // POST: api/AppUsers
        [ResponseType(typeof(AppUser))]
        public async Task<IHttpActionResult> PostAppUser(AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AppUsers.Add(appUser);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = appUser.ID }, appUser);
        }

        // DELETE: api/AppUsers/5
        [ResponseType(typeof(AppUser))]
        public async Task<IHttpActionResult> DeleteAppUser(int id)
        {
            AppUser appUser = await db.AppUsers.FindAsync(id);
            if (appUser == null)
            {
                return NotFound();
            }

            db.AppUsers.Remove(appUser);
            await db.SaveChangesAsync();

            return Ok(appUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppUserExists(int id)
        {
            return db.AppUsers.Count(e => e.ID == id) > 0;
        }
    }
}