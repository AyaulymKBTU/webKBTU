using AspIdentity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspIdentity.Models
{
    public class Project
    {
        
        public int Id { get; set; }
        public string Title { get; set; }
        public virtual ICollection<PTask> ProjectTasksList { get; set; }
       
    }
}