using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspIdentity.Models
{
    
    public class PTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public DateTime PredictedFinishTime { get; set; }
        public Status TaskStatus { get; set; }
        public string ParentTask { get; set; }
        public virtual ICollection<ApplicationUser> Performers { get; set; }
    }
}