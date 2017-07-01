export class AspNetUsers{
   public AspNetUserClaims: AspNetUserClaims [];
    public AspNetUserLogins:  AspNetUserLogins[];
    public AspNetRoles: AspNetRoles[];
    public Id: string;
    public FirstName: string;
    public LastName: string;
    public Level: number;
    public JoinDate:string;
    public Email:string;
    public EmailConfirmed:boolean;
    public PasswordHash: string;
    public SecurityStamp: string;
    public PhoneNumber: string;
    public PhoneNumberConfirmed: boolean;
     public TwoFactorEnabled: boolean;
      public LockoutEndDateUtc: string;
     public LockoutEnabled: boolean;
     public AccessFailedCount: number;
     public UserName: string;
     public Tasks:Tasks[];

}
export class AspNetUserClaims
    {   public  Id:number ;
        public  UserId :string;
        public  ClaimType: string;
        public  ClaimValue: string;
    
        public  AspNetUsers: AspNetUsers[] ;
}
 export class AspNetUserLogins
    {
       public   Id : number; 
        public  LoginProvider:string;
        public  ProviderKey:string;
        public  UserId:string; 
    
        public AspNetUsers: AspNetUsers[];
    }
    export class AspNetRoles{
      public  Id:string ;
        public Name: string ;
        public AspNetUsers: AspNetUsers[];
        public Projects: Projects[];
    }
    export class Projects{
        public  Id: number; 
        public  Title:string ;
    
        public Tasks: Tasks[] ;

        public AspNetRoles: AspNetRoles[] ;
    }
    export class Tasks{
        public  Id:number ;
        public UserId:string;
        public  Title:string ;
        public  StartTime: string;
        public  FinishTime: string ;
        public  PredictedFinishTime:string ;
        public  ParentTaskId:number ;
        public  Description:string ;
        public  StatusId:number ;
        public  ProjectId:number ;
    
        public Projects: Projects ;
        public States:States ;
        public AspNetUsers: AspNetUsers;
      
    }
    export  class States
    {
         public Id :number;
        public  State:string ;
    
        
        public Tasks: Tasks[]; 
    }