using AspIdentity.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace AspIdentity.Models.DTO
{
   
    public class ProjectNRoleDTO
    {
       
               
            
        public Projects Project { get; set; }
        public Dictionary<string,bool> Roles { get; set; }
        public List<AspNetUsers> Users { get; set; }
        public List<AspNetRoles> AllRoles { get; set; }
        public List<AspNetUsers> MyUsers { get; set; }
        public HashSet<AspNetUsers> Hashset { get; set; }
       
    }
}