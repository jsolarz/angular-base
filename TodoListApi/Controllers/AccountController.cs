using Microsoft.AspNet.Identity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using TodoList.Api.Infrastructure.Data;
using TodoList.Api.Models;

namespace TodoList.Api.Controllers
{
    /// <summary>
    /// User account management
    /// </summary>
    public class AccountController : ApiController
    {
        private AuthRepository _repo = null;
        private TodoListContext db = new TodoListContext();

        public AccountController()
        {
            _repo = new AuthRepository();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appUser"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public async Task<IHttpActionResult> PostRegister(AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userModel = new UserModel
            {
                UserName = appUser.Email,
                Password = appUser.Password,
                ConfirmPassword = appUser.Password
            };

            IdentityResult result = await _repo.RegisterUser(userModel);
            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            db.AppUsers.Add(appUser);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = appUser.ID }, appUser);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<IHttpActionResult> PostLogin(string email, string password)
        {
            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
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

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
