import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { AspNetUsers,Projects,AspNetRoles,AspNetUserClaims,AspNetUserLogins,Tasks,States} from './shared/classes';
import {DataService} from './shared/data.service';
import TaskWorldComponent from './task-world-component';
const Statuses:string[]=[
  "planning","processing","done"
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  forEdit:boolean=false;
  toAdd:boolean=false;
  OriginalTasks:Tasks[]=[];
  Tasks:Tasks[]=[];
  Projects:Projects[]=[];
  selectedProject: Projects;
  tasks: Tasks[]=[]; 
  showeditor:boolean=false;
  states:string[]=Statuses;
  taskTitle:string;
  taskStartTime:string="2017-06-15";
  taskFinishTime:string="2017-06-15";
  taskPredictedFinishTime:string="2017-06-15";
  taskParentTask:any;
  taskState:string;
  description:string;
  parentIsSet:boolean=false;
  selectedParent:string="";
  userName:string="";
  idiwka:any;
  htmlToAdd:string ;
  children:Tasks[]=[];
  componentData:any = null;
 
  createTaskComponent(task:Tasks){
    this.getMyChildren(task);
    this.componentData = {
      component: TaskWorldComponent,
      inputs: {
        tasks: this.children,
        Tasks:this.Tasks
      }
    };
  }
  getMyChildren(task:Tasks)
  {this.children=[];
    for(var i=0;i<this.Tasks.length;i++)
    {
      
      if(this.Tasks[i].ParentTaskId==task.Id)
      this.children.push(this.Tasks[i]);
    }
  }
  saveChanges(task:Tasks)                                                          //9
  {
    for(var i=0;i<this.Tasks.length;i++)
    {
      if(this.Tasks[i].Id==task.Id)
      {
      this.Tasks[i]=task;}
      
    }
     for(var i=0;i<this.tasks.length;i++)
    {
      if(this.tasks[i].Id==task.Id)
       this.tasks[i]=task;
    }
    
  }
 
  onSelect(project: Projects): void {
    this.componentData=null;
    let m=new Tasks();
    m.Title="";
    m.Id=1000000;
    m.ParentTaskId=1000000;
    this.createTaskComponent(m);

    this.selectedParent="";
    this.showeditor=false;                                             //2
    this.tasks=[];
    this.selectedProject = project;
    for(var i=0;i<this.Tasks.length;i++)
    {
      
      if(this.Tasks[i].ProjectId==project.Id)
      this.tasks.push(this.Tasks[i]);
    }
    
   
   
  }
  getParent(parentid:any)                                                         //4
  {
    for(var i=0;i<this.Tasks.length;i++)
    {
        if(this.Tasks[i].Id==parentid)
        {
          return this.Tasks[i].Title;
        }
    }
    var parent="";
    return parent;
  }
  getMystatus(task:Tasks)                                                         //5
  {var s="";
    if(task.StatusId==3){
    s= "planning";}
    else if(task.StatusId==2)
   {s="processing";}
     else if(task.StatusId==1)
     {s="done"}
    return s;
  }
  callType(value:any){                                                            //6
   
    this.taskState=value;
    
  }
  callTypeParent(m:any)
  {
    this.taskParentTask=m;
  }
  setTaskP(task:Tasks)
  {
    
    this.selectedParent=task.Title;
    this.parentIsSet=true;
    
  }
  showEditTask(Mytask:Tasks)                                                   //3
  {
    this.forEdit=true;
    this.toAdd=false;
    this.taskTitle=Mytask.Title;

    if(Mytask.ParentTaskId){
    this.taskParentTask= this.getParent(Mytask.ParentTaskId);
    }
    this.description=Mytask.Description;
   this.idiwka=Mytask.Id;
   if(Mytask.StartTime.length==19)
    this.taskStartTime=Mytask.StartTime.substring(0,Mytask.StartTime.length-9).toString();
    else
    this.taskStartTime=Mytask.StartTime
    if(Mytask.FinishTime.length==19)
    this.taskFinishTime=Mytask.FinishTime.substring(0,Mytask.FinishTime.length-9).toString();
    else
    this.taskFinishTime=Mytask.FinishTime;
    if(Mytask.PredictedFinishTime.length==19)
    this.taskPredictedFinishTime=Mytask.PredictedFinishTime.substring(0,Mytask.PredictedFinishTime.length-9).toString();
    else
    this.taskPredictedFinishTime=Mytask.PredictedFinishTime;
   
    this.taskState=this.getMystatus(Mytask );
   
    this.showeditor=true;
  }
  showEditForTask(Mytask:Tasks)                                                   //3
  {
    this.forEdit=true;
    this.toAdd=false;
    this.taskTitle=Mytask.Title;

    if(Mytask.ParentTaskId){
    this.taskParentTask= this.getParent(Mytask.ParentTaskId);
    }
    this.description=Mytask.Description;
   this.idiwka=Mytask.Id;
   if(Mytask.StartTime.length==19)
    this.taskStartTime=Mytask.StartTime.substring(0,Mytask.StartTime.length-9).toString();
    else
    this.taskStartTime=Mytask.StartTime
    if(Mytask.FinishTime.length==19)
    this.taskFinishTime=Mytask.FinishTime.substring(0,Mytask.FinishTime.length-9).toString();
    else
    this.taskFinishTime=Mytask.FinishTime;
    if(Mytask.PredictedFinishTime.length==19)
    this.taskPredictedFinishTime=Mytask.PredictedFinishTime.substring(0,Mytask.PredictedFinishTime.length-9).toString();
    else
    this.taskPredictedFinishTime=Mytask.PredictedFinishTime;
   
    this.taskState=this.getMystatus(Mytask );
   
    this.showeditor=true;
  }
  
  DeleteTask()
  {
    var t=new Tasks();
    t=this.getMyTask(this.taskTitle);
    this._dataService.DeleteTask(t);
    let ind=this.Tasks.indexOf(t);
    this.Tasks.splice(ind,1);
     ind=this.tasks.indexOf(t);
      this.tasks.splice(ind,1);
    this.showeditor=false;
  }
  HideEditor()
  {
    this.showeditor=false;
  }
  getStatus(status:string)//dopisat'                                        //8.2       
  {
    var s;
    if(status=="planning")
    s= 3;
    else if(status=="done")
    s= 1;
    else if(status=="processing")
    s= 2;
    
    return s;
  }
  getIdForTask(parent:string)                                               //8.3
  {
   for(var i=0;i<this.Tasks.length;i++)
   {
     if(this.Tasks[i].Title==parent)
     return this.Tasks[i].Id;
   }
  }
  saveTask(task:Tasks)                                                         //8.1
  {
    task.Title=this.taskTitle;
    task.Description=this.description;

    task.FinishTime=this.taskFinishTime;
    task.PredictedFinishTime=this.taskPredictedFinishTime;
    task.StartTime=this.taskStartTime;

    if(this.getStatus(this.taskState))
    task.StatusId=this.getStatus(this.taskState);

    task.ProjectId=this.selectedProject.Id;

      if(this.getIdForTask(this.taskParentTask))
    task.ParentTaskId=this.getIdForTask(this.taskParentTask);
  
     return task;
  }
   saveItem()                                                                 //7
  {    
    var task=new Tasks();
    task.Id=this.idiwka;
    task=this.saveTask(task); 

    var s=new States();
    s.Id=task.StatusId;
    s.State=this.taskState;
   task.States=s;
   
   this.saveChanges(task);
    this.OriginalTasks=this.Tasks;
    this._dataService.PutTask(task);
    this.Tasks=this.OriginalTasks;

    
     this.showeditor=false;
    
  }
  addItem()                                                                    //7
  {
    var task=new Tasks();
    task.Id=0;
    task=this.saveTask(task);
  
    
   task.States=null;
     this.OriginalTasks=this.Tasks;
    this._dataService.PostTask(task);
     this.Tasks=this.OriginalTasks;

     var s=new States();
    s.Id=task.StatusId;
    s.State=this.taskState;
   task.States=s;
    this.tasks.push(task);
    //if(this.Tasks.indexOf(task)>0)
    this.Tasks.push(task);
    this.showeditor=false;
  }
  
  htmlForTask(task:Tasks)
  {
      var myhtml=`' <table class="table table-striped">
      <tbody><tr (click)="setParentTask(n,getMyTask(Myname))"(dblclick)="showEditForTask(getMyTask(Myname))">
      <td #Myname>'+task.Title+"</td> <td>"+task.StartTime+"</td>
      <td>"+task.FinishTime+"</td><td>"+task.States.State+'</td>
      </tr><tr class="children"#n></tr></tbody> </table>';`
    return myhtml;
  }
  setParentTask(task:Tasks)
  { 
    console.log("h "+task.Title);
    this.selectedParent=task.Title;
    this.parentIsSet=true;
    
    
  }
 
  editTask()
  {// all inputs should be empty, but if one task was selected,            //3
    // then in parent task field we have to write its name.
    this.taskTitle="";
    this.description="";
    this.taskStartTime="";
    this.taskFinishTime="";
    this.taskParentTask="";
    this.taskState="done";
    this.taskPredictedFinishTime="";
    this.forEdit=false;
    this.toAdd=true;
    this.showeditor=true;
    if(this.parentIsSet)
    this.taskParentTask=this.selectedParent;
    console.log("show editor");
  }
 
getMyTask(name:string)
{
  for(var i=0;i<this.Tasks.length;i++)
  {
    if(this.Tasks[i].Title==name)
        return this.Tasks[i];
  }
}
  constructor(private _dataService: DataService) {}
  ngOnInit() {                                                            //1
    this._dataService.GetTasks().subscribe(tasks=>this.Tasks=tasks,
     error => console.log(error||error.message),
        () => console.log('Got all tasks'));
   this._dataService
        .GetProjects()
        .subscribe(projects => this.Projects = projects,
        error => console.log(error||error.message),
        () => console.log('Got all projects'));
   }
  

}
