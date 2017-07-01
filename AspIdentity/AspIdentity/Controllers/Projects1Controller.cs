using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AspIdentity;

namespace AspIdentity.Controllers
{
    public class Projects1Controller : ApiController
    {
        private AspIdentityEntities db = new AspIdentityEntities();

        // GET: api/Projects1
        public IQueryable<Projects> GetProjects()
        {
            return db.Projects;
        }

        // GET: api/Projects1/5
        [ResponseType(typeof(Projects))]
        public async Task<IHttpActionResult> GetProjects(int id)
        {
            Projects projects = await db.Projects.FindAsync(id);
            if (projects == null)
            {
                return NotFound();
            }

            return Ok(projects);
        }

        // PUT: api/Projects1/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProjects(int id, Projects projects)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projects.Id)
            {
                return BadRequest();
            }

            db.Entry(projects).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectsExists(id))
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

        // POST: api/Projects1
        [ResponseType(typeof(Projects))]
        public async Task<IHttpActionResult> PostProjects(Projects projects)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Projects.Add(projects);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = projects.Id }, projects);
        }

        // DELETE: api/Projects1/5
        [ResponseType(typeof(Projects))]
        public async Task<IHttpActionResult> DeleteProjects(int id)
        {
            Projects projects = await db.Projects.FindAsync(id);
            if (projects == null)
            {
                return NotFound();
            }

            db.Projects.Remove(projects);
            await db.SaveChangesAsync();

            return Ok(projects);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectsExists(int id)
        {
            return db.Projects.Count(e => e.Id == id) > 0;
        }
    }
}