onclick="if(this.checked){
                                           @{ string s = "h";
                                               string w = "";
                                               var r = new List<AspNetRoles>();
                                               foreach (var alro in ViewBag.Roles)
                                               {
                                                   foreach (var ro in Model.Roles.Keys)
                                                   {
                                                       if (alro.Name == ro)
                                                       {
                                                           r.Add(alro);
                                                       }
                                                   }

                                                       }
                                                       List<AspNetRoles> m = new List<AspNetRoles>();
                                                       if (r != null) {
                                                           m = r.ToList();
                                                       }
                                                       if (r.Count() != 0)
                                                       {

                                                           foreach (AspNetRoles role in r)
                                                           {
                                                               foreach (AspNetUsers user in role.AspNetUsers)
                                                               {
                                                                   Model.Hashset.Add(user);
                                                               }
                                                           }
                                                           foreach (AspNetUsers us in Model.Hashset)
                                                           {
                                                               s += us.UserName + ',';
                                                           }
                                                           w = s;
                                                       } }

                                           $('#users').append('@w');}">
