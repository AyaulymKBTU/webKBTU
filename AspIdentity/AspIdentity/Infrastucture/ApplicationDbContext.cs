using AspIdentity;
using AspIdentity.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AspIdentity.Infrastucture
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
         
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<Tasks> ProjectTasks { get; set; }
        public DbSet<Project> ProjectsSet { get; set; }
        public DbSet<Status> States { get; set; }
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

    }
}