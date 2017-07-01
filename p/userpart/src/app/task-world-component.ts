import {Component,Output, Injector,EventEmitter} from '@angular/core';
import { AspNetUsers,Projects,AspNetRoles,AspNetUserClaims,AspNetUserLogins,Tasks,States} from './shared/classes';


@Component({
  selector: 'task-world',
  styleUrls: ['./app.component.css'],
  template: `
  <p style="background-color: #f1f1f1">{{Title}}</p>
     <div *ngFor="let Mytask of tasks">
                        <thead></thead>
                        <tbody>
                            <tr  (click)="setParentTask(Mytask)" (dblclick)="showEditForTask(Mytask)" >
                                <td>{{Mytask.Title}}</td>
                                <td>{{Mytask.StartTime}}</td>
                                <td>{{Mytask.FinishTime}}</td>
                                <td>{{Mytask.States.State}}</td>
                                <td> <button (click)="createTaskComponent(Mytask)">SubTasks</button>
                                <td>
                            </tr>
                        </tbody>    
                    </div>
                    <dynamic-component [componentData]="componentData"></dynamic-component>
  `,
})
export default class TaskWorldComponent {
  Title:string="";
  tasks:Tasks[] = [];
  Tasks:Tasks[] = [];
  children:Tasks[]=[];
  componentData:any = null;
  @Output() selectedParent=new EventEmitter();
  @Output()  parentIsSet=new EventEmitter();

setParentTask(mytask:Tasks)
  {
   
    this.selectedParent.emit(mytask);
  }
  showEditForTask(mytask:Tasks)
  {
  
    this.parentIsSet.emit(mytask);
  }
  getMyChildren(task:Tasks)
  {this.children=[];
    for(var i=0;i<this.Tasks.length;i++)
    {
      
      if(this.Tasks[i].ParentTaskId==task.Id)
      this.children.push(this.Tasks[i]);
    }
  }
  
 getPapa(id:any)
   {
     
     for(var i=0;i<this.Tasks.length;i++)
    {
        if(this.Tasks[i].Id==id)
        {
           return this.Tasks[i].Title;
        }
    }
    var parent="";
   return parent;
  
  }
createTaskComponent(task:Tasks){
  if(task.ParentTaskId){
    this.getMyChildren(task);}
    this.componentData = {
      component: TaskWorldComponent,
      inputs: {
        tasks: this.children
      }
    };
  }

  constructor(private injector: Injector) {
    this.tasks = this.injector.get('tasks');
    this.Tasks=this.injector.get('Tasks');
    if(this.tasks.length>0){
    if(this.tasks[0].ParentTaskId){
    this.Title=this.getPapa(this.tasks[0].ParentTaskId);}
  }
  }
}
