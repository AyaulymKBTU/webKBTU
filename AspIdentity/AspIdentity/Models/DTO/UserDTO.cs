using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspIdentity.Models.DTO
{
    public class UserDTO
    {
        public AspNetUsers User { get; set; }
        public Dictionary<string, bool> Roles { get; set; }
        public List<AspNetUsers> Users { get; set; }
        public List<AspNetRoles> AllRoles { get; set; }
       public List<Projects> Projects { get; set; }
        public HashSet<AspNetUsers> Hashset { get; set; }
    }
}