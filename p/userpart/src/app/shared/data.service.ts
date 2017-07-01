import { Http, Response, Headers,RequestOptions } from '@angular/http';
import{Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import {AspNetRoles,AspNetUserClaims,AspNetUserLogins,AspNetUsers,Projects,Tasks,States} from './classes';


@Injectable()
export class DataService { 
    Users:AspNetUsers[] =[];
   Projects: Projects[]=[];
  Tasks:Tasks[]=[];
  private actionUrl: string;
  constructor(private _http: Http, ) {
    this.actionUrl = 'http://localhost:58592/api/aspnetusers1';
}
 

public GetAll = (): Observable<any> => {
    return this._http.get(this.actionUrl)
        .map(res => res.json() as AspNetUsers[]) 
        .map(users=>this.Users=users)
        .catch(this.handleError);
}
public GetProjects = (): Observable<any> => {
    return this._http.get('http://localhost:58592/api/projects1')
        .map(res => res.json() as Projects[]) 
        .map(projects=>this.Projects=projects)
        .catch(this.handleError);
}
public  GetTasks = (): Observable<any> => {
    return this._http.get('http://localhost:58592/api/tasks')
        .map(res => res.json() as Tasks[]) 
        .map(tasks=>this.Tasks=tasks)
        .catch(this.handleError);
}
public PostTask(task:Tasks){
    let headers=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:headers});
    

    this._http.post('http://localhost:58592/api/tasks',task,options)
        .map(res => res.json() as Tasks)
       // .map(task=>this.Tasks.push(task)) 
        .catch(this.handleError)
        .subscribe();
}
public PutTask(task:Tasks){
    let headers=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:headers});

    
var id=task.Id;
var url= 'http://localhost:58592/api/tasks/'+id;
    this._http.put(url,task,options)
        .map(res => res.json() as Tasks)
      //  .map(task=>this.Tasks.push(task)) 
        .catch(this.handleError)
        .subscribe();
}
public DeleteTask(task:Tasks)
{ let headers=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:headers});
    
var id=task.Id;
var url= 'http://localhost:58592/api/tasks/'+id;
this._http.delete(url,options)
        .map(res => res.json() as Tasks)
      //  .map(task=>this.Tasks.push(task)) 
        .catch(this.handleError)
        .subscribe();


}
      private handleError(error:any)
    {
        console.log('error');
        
        return Observable.throw(error.message||error);
    }

}