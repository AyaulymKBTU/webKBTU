using AspIdentity.Infrastucture;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace AspIdentity.Controllers
{
    // [Authorize(Roles="Admin")]
    
    public class HomeController : Controller
    {
        private AspIdentityEntities2 db = new AspIdentityEntities2();

        public ActionResult Index()
        {
            ViewBag.Title = "Start Page";

            return View(db.Projects);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FirstName,PassWord")] AspNetUsers aspNetUsers)
        {
            if (ModelState.IsValid)
            {
                db.Entry(aspNetUsers).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(aspNetUsers);
        }

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
            return View(aspNetUsers);

            
        }
    }
}
