using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AspIdentity;
using AspIdentity.Models.DTO;

namespace AspIdentity.Controllers
{
    public class AspNetUsersController : Controller
    {
        private AspIdentityEntities2 db = new AspIdentityEntities2();

        // GET: AspNetUsers
        public ActionResult Index()
        {
            return View(db.AspNetUsers.ToList());
        }

        // GET: AspNetUsers/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUsers aspNetUsers = db.AspNetUsers.Find(id);
            if (aspNetUsers == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUsers);
        }
        public AspNetRoles find(string s)
        {
            var roles =
            from c in db.AspNetRoles
            where c.Name == s
            select c;
            AspNetRoles a = roles.ToList().Last();
            return a;
        }
        // GET: AspNetUsers/Create
        public ActionResult Create()
        {
            AspNetUsers user = new AspNetUsers();
            user.Id = DateTime.Now.Ticks.ToString();
            user.AccessFailedCount = 0;
            user.Level = 2;

            UserDTO mymodel = new UserDTO();
            mymodel.User = user;
            Dictionary<string, bool> dict = new Dictionary<string, bool>();
            foreach (AspNetRoles arole in db.AspNetRoles)
            {

                dict.Add(arole.Name, false);

            }
            mymodel.Roles = dict;
            mymodel.S = "";

            return View(mymodel);


        }

        // POST: AspNetUsers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,FirstName,LastName,Level,JoinDate,Email,EmailConfirmed,PasswordHash,SecurityStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEndDateUtc,LockoutEnabled,AccessFailedCount,UserName")] AspNetUsers aspNetUsers)
        //// public ActionResult Create([Bind(Include = "Id,FirstName,LastName,Email,PasswordHash,UserName")] AspNetUsers aspNetUsers)
        //{
        //    if (ModelState.IsValid)
        //    {

        //        db.AspNetUsers.Add(aspNetUsers);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(aspNetUsers);
        //}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(UserDTO dto)
        {
            if (dto.User.UserName != null && dto.User.FirstName != null && dto.User.LastName != null && dto.User.PasswordHash != null)
            {
                AspNetUsers user = new AspNetUsers();
                user = dto.User;

                user.AspNetRoles.Clear();
                if (dto.Roles != null)
                {
                    foreach (string s in dto.Roles.Keys)
                    { user.AspNetRoles.Add(find(s)); }
                }
                db.AspNetUsers.Add(dto.User);
                //db.Entry(user).State = EntityState.Modified;

                db.SaveChanges();
            }
            return RedirectToAction("Users","Projects");


        }
        public ActionResult Des(string S)//public string Des(string S)
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
            foreach (Projects us in a.Projects)
            { f += us.Title + '*'; }
            ForAJAXDTO aj = new ForAJAXDTO();
            if (f.Length > 1)
                f = f.Substring(0, f.Length - 1);
            aj.S = f;

            return Json(aj, JsonRequestBehavior.AllowGet);
            // return f;

        }

        // GET: AspNetUsers/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUsers aspNetUsers = db.AspNetUsers.Find(id);
            if (aspNetUsers == null)
            {
                return HttpNotFound();
            }
            UserDTO mymodel = new UserDTO();
            
            Dictionary<string, bool> dict = new Dictionary<string, bool>();
            foreach (AspNetRoles arole in db.AspNetRoles)
            {

                if (aspNetUsers.AspNetRoles.Contains(arole))
                    dict.Add(arole.Name, true);
                else
                    dict.Add(arole.Name, false);

            }
            mymodel.User = aspNetUsers;
            mymodel.Roles = dict;
            mymodel.S = "";
            mymodel.Hashset = new HashSet<AspNetUsers>();
            ViewBag.Roles = db.AspNetRoles.ToList();
            ViewBag.Users = db.AspNetUsers.ToList();
            return View(mymodel);
        }

        // POST: AspNetUsers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        // public ActionResult Edit([Bind(Include = "Id,FirstName,LastName,Level,JoinDate,Email,EmailConfirmed,PasswordHash,SecurityStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEndDateUtc,LockoutEnabled,AccessFailedCount,UserName")] AspNetUsers aspNetUsers)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(aspNetUsers).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    return View(aspNetUsers);
        //}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(UserDTO dto)
        {
            AspNetUsers user = db.AspNetUsers.Find(dto.User.Id);
            user.LastName = dto.User.LastName;
            user.JoinDate = dto.User.JoinDate;
            user.PasswordHash = dto.User.PasswordHash;
            user.FirstName = dto.User.FirstName;
            user.UserName = dto.User.UserName;
            user.AspNetRoles.Clear();
            if (dto.Roles != null)
            {
                foreach (string s in dto.Roles.Keys)
                { user.AspNetRoles.Add(find(s)); }
            }

            db.Entry(user).State = EntityState.Modified;

            db.SaveChanges();
            return RedirectToAction("Users","Projects",null);


        }


        // GET: AspNetUsers/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUsers aspNetUsers = db.AspNetUsers.Find(id);
            if (aspNetUsers == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUsers);
        }

        // POST: AspNetUsers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            AspNetUsers aspNetUsers = db.AspNetUsers.Find(id);
            db.AspNetUsers.Remove(aspNetUsers);
            db.SaveChanges();
            return RedirectToAction("Users","Projects");
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
