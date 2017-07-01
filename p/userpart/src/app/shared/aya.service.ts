import { Http, Response, Headers } from '@angular/http';
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
posttaskurl:string;
puttaskurl:string;
private actionUrl: string;

constructor(private _http: Http, ) {
    this.actionUrl = 'http://localhost:58592/api/aspnetusers1';
    this.posttaskurl='http://localhost:58592/api/tasks'; 
    this.puttaskurl='http://localhost:58592/api/tasks'; //+ id;
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
/*public PostTask=():Observable<any> => {//dodelat!!!!
    return this._http.get(this.posttaskurl)
        .
}*/
      private handleError(error:any)
    {
        console.log('error');
        
        return Observable.throw(error.message||error);
    }

}