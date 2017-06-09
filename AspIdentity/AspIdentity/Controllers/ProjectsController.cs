using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AspIdentity;
using System.Dynamic;
using AspIdentity.Models.DTO;
using System.Web.Services;
using System.Web.Script.Services;
using Newtonsoft.Json.Linq;

namespace AspIdentity.Controllers
{
    public class ProjectsController : Controller
    {
        private AspIdentityEntities2 db = new AspIdentityEntities2();

        // GET: Projects
        public ActionResult Index(string searchString)
        {

            var projects = from s in db.Projects
                           select s;
            if (!String.IsNullOrEmpty(searchString))
            {
                projects = projects.Where(s => s.Title.Contains(searchString));
            }


            return View(projects.ToList());

            //return View(db.Projects.ToList());
        }

        // GET: Projects/Details/5                                             NEEEEED TO CORRRRRRECT!!!!!!
        public ActionResult Details(string s)
        {

            AspNetRoles a = new AspNetRoles();
            foreach (AspNetRoles role in db.AspNetRoles)
            {
                if (role.Name == s)
                { a = role; }
            }

            List<AspNetUsers> list = new List<AspNetUsers>();
            foreach (AspNetUsers user in a.AspNetUsers)
            {
                list.Add(user);
            }
            return PartialView("UserDetails", list);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat=ResponseFormat.Json)]
        public ActionResult Des(string S)
        {
            
            AspNetRoles a = new AspNetRoles();
            foreach (AspNetRoles role in db.AspNetRoles)
            {
                if (role.Name == S)
                {
                    a = role;
                }
            }
            string f = "*";
            foreach (AspNetUsers us in a.AspNetUsers)
            { f += us.UserName + '*'; }
            ForAJAXDTO aj = new ForAJAXDTO();
            if (f.Length > 1)
            {
                f = f.Substring(0, f.Length - 1);
            }
            aj.S = f;
            return Json(aj,JsonRequestBehavior.AllowGet);

        }
        public ActionResult Users()
        {

            return View(db.AspNetUsers.ToList());
        }
        // GET: Projects/Create
        public ActionResult Create()
        {
            Projects projects =new Projects();
            

            ProjectNRoleDTO mymodel = new ProjectNRoleDTO();
            mymodel.Project = projects;
            Dictionary<string, bool> dict = new Dictionary<string, bool>();
            foreach (AspNetRoles arole in db.AspNetRoles)
            {
                
                    dict.Add(arole.Name, false);
               
            }
            mymodel.Roles = dict;
            mymodel.S = "";
            mymodel.Hashset = new HashSet<AspNetUsers>();
            ViewBag.Roles = db.AspNetRoles.ToList();
            ViewBag.Users = db.AspNetUsers.ToList();
            return View(mymodel);

        }
        

        // POST: Projects/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public ActionResult Create(ProjectNRoleDTO dto, string role)
        {
            if (dto.Project.Title != null)
            {
                Projects projects = new Projects();

                projects.Id = dto.Project.Id ;
                projects.Title = dto.Project.Title;

                if (dto.Roles != null)
                {
                    foreach (string s in dto.Roles.Keys)
                    { projects.AspNetRoles.Add(find(s)); }
                }
                if (role != "")
                {
                    AspNetRoles a = new AspNetRoles();
                    a.Id = DateTime.Now.Ticks.ToString();
                    a.Name = role;
                    projects.AspNetRoles.Add(a);
                }
                db.Projects.Add(projects);
                db.SaveChanges();
            }


            return RedirectToAction("Index", "Projects");
        }

        // GET: Projects/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Projects projects = db.Projects.Find(id);
            if (projects == null)
            {
                return HttpNotFound();
            }

            ProjectNRoleDTO mymodel = new ProjectNRoleDTO();
            mymodel.Project = projects;
            Dictionary<string, bool> dict = new Dictionary<string, bool>();
            foreach (AspNetRoles arole in db.AspNetRoles)
            {
                if (projects.AspNetRoles.Contains(arole))
                    dict.Add(arole.Name, true);
                else
                    dict.Add(arole.Name, false);
            }
            mymodel.Roles = dict;
            mymodel.S = "";
            mymodel.Hashset = new HashSet<AspNetUsers>();
            ViewBag.Roles = db.AspNetRoles.ToList();
            ViewBag.Users = db.AspNetUsers.ToList();
            return View(mymodel);


        }

        // POST: Projects/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        public AspNetRoles find(string s)
        {
            var roles =
            from c in db.AspNetRoles
            where c.Name == s
            select c;
            AspNetRoles a = roles.ToList().Last();
            return a;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(ProjectNRoleDTO dto)
        {
            Projects projects = db.Projects.Find(dto.Project.Id);
            projects.Title = dto.Project.Title;
            projects.AspNetRoles.Clear();
            if (dto.Roles!=null)
            {
                foreach (string s in dto.Roles.Keys)
                { projects.AspNetRoles.Add(find(s)); }
            }

            db.Entry(projects).State = EntityState.Modified;

            db.SaveChanges();
            return RedirectToAction("Index");


        }

        // GET: Projects/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Projects projects = db.Projects.Find(id);
            if (projects == null)
            {
                return HttpNotFound();
            }
            return View(projects);
        }

        // POST: Projects/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Projects projects = db.Projects.Find(id);
            projects.AspNetRoles.Clear();
            db.Projects.Remove(projects);

            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
