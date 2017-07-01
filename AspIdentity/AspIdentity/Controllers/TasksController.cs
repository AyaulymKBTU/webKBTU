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
    public class TasksController : ApiController
    {
        private AspIdentityEntities db = new AspIdentityEntities();

        // GET: api/Tasks
        public IQueryable<Tasks> GetTasks()
        {
            return db.Tasks;
         
        }

        // GET: api/Tasks/5
        [ResponseType(typeof(Tasks))]
        public async Task<IHttpActionResult> GetTasks(int id)
        {
            Tasks tasks = await db.Tasks.FindAsync(id);
            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasks);
        }

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTasks(int id, Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tasks.Id)
            {
                return BadRequest();
            }

            db.Entry(tasks).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
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

        // POST: api/Tasks
        [ResponseType(typeof(Tasks))]
        public async Task<IHttpActionResult> PostTasks(Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (ModelState.IsValid)
                {
                    db.Tasks.Add(tasks);
                    await db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            { Console.WriteLine(e.Message); }
            return CreatedAtRoute("DefaultApi", new { id = tasks.Id }, tasks);
        }

        // DELETE: api/Tasks/5
        [ResponseType(typeof(Tasks))]
        public async Task<IHttpActionResult> DeleteTasks(int id)
        {
            Tasks tasks = await db.Tasks.FindAsync(id);
            if (tasks == null)
            {
                return NotFound();
            }

            db.Tasks.Remove(tasks);
            await db.SaveChangesAsync();

            return Ok(tasks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TasksExists(int id)
        {
            return db.Tasks.Count(e => e.Id == id) > 0;
        }
    }
}