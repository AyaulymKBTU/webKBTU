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
using System.Web.Script.Serialization;

namespace AspIdentity.Controllers
{

    public class ProjectsController : Controller
    {
        private AspIdentityEntities db = new AspIdentityEntities();

        // GET: Projects
        public ActionResult Index(string searchString)
        {

            //var projects = from s in db.Projects
            //               select s;
            //if (!String.IsNullOrEmpty(searchString))
            //{
            //    projects = projects.Where(s => s.Title.Contains(searchString));
            //}


            //return View(projects.ToList());

            return View(db.Projects.ToList());
        }

        // GET: Projects/Details/5                                           
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
        public List<string> GetRoles()
        {
            List<string> L = new List<string>();
            foreach (AspNetRoles a in db.AspNetRoles)
            { L.Add(a.Name); }

            return L;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult Des(string S)
        {
            List<string> L = GetRoles();
            string[] values = S.Split(',');
            List<AspNetRoles> a = new List<AspNetRoles>();
            for (int i = 0; i < values.Length; i++)
            {
                if (values[i] == "true")
                {
                    a.Add(find(L[i]));
                }
            }
            HashSet<string> names = new HashSet<string>();
            foreach (AspNetRoles role in a)
            {
                foreach (AspNetUsers user in role.AspNetUsers)
                {
                    names.Add(user.UserName);
                }
            }
            string f = "";
            foreach (string us in names)
            { f += us + ','; }
            ForAJAXDTO aj = new ForAJAXDTO();
            if (f.Length > 1)
            {
                f = f.Substring(0, f.Length - 1);
            }
            aj.S = f;
            return Json(aj, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Users()
        {

            return View(db.AspNetUsers.ToList());
        }
        // GET: Projects/Create
        public ActionResult Create()
        {
            Projects projects = new Projects();


            ProjectNRoleDTO mymodel = new ProjectNRoleDTO();
            mymodel.Project = projects;
            Dictionary<string, bool> dict = new Dictionary<string, bool>();
            foreach (AspNetRoles arole in db.AspNetRoles)
            {

                dict.Add(arole.Name, false);

            }
            mymodel.Roles = dict;

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
                var names = from c in db.Projects
                            select c.Title;
                List<string> titles = names.ToList();
                if (!titles.Contains(dto.Project.Title))
                {
                    Projects projects = new Projects();

                    projects.Id = dto.Project.Id;
                    projects.Title = dto.Project.Title;

                    if (dto.Roles != null)
                    {
                        foreach (string s in dto.Roles.Keys)
                        { projects.AspNetRoles.Add(find(s)); }
                    }
                    if (role != "")
                    {
                        var ro = from c in db.AspNetRoles
                                 select c.Name;
                        List<string> rolesofproject = ro.ToList();
                        if (!rolesofproject.Contains(role))
                        {
                            AspNetRoles a = new AspNetRoles();
                            a.Id = DateTime.Now.Ticks.ToString();
                            a.Name = role;
                            projects.AspNetRoles.Add(a);
                        }
                        else
                        {
                            var roles = from f in db.AspNetRoles
                                        where f.Name == role
                                        select f;

                            AspNetRoles a = new AspNetRoles();
                            a = roles.ToList().Last();
                            projects.AspNetRoles.Add(a);
                        }
                    }
                    db.Projects.Add(projects);
                    db.SaveChanges();
                }
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
                {

                    dict.Add(arole.Name, true);
                    if (arole.AspNetUsers.Count > 0)
                    {
                        mymodel.MyUsers = new List<AspNetUsers>();
                        foreach (AspNetUsers aus in arole.AspNetUsers)
                        { mymodel.MyUsers.Add(aus); }
                    }
                }
                else
                    dict.Add(arole.Name, false);
            }
            mymodel.Roles = dict;

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
            if (dto.Roles != null)
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
            
            foreach (Tasks t in projects.Tasks)
            {

                db.Tasks.Remove(t);
            }
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