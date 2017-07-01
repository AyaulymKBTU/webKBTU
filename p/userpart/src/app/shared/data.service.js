"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/do");
var Observable_1 = require("rxjs/Observable");
var DataService = (function () {
    function DataService(_http) {
        var _this = this;
        this._http = _http;
        this.Users = [];
        this.Projects = [];
        this.Tasks = [];
        this.GetAll = function () {
            return _this._http.get(_this.actionUrl)
                .map(function (res) { return res.json(); })
                .map(function (users) { return _this.Users = users; })
                .catch(_this.handleError);
        };
        this.GetProjects = function () {
            return _this._http.get('http://localhost:58592/api/projects1')
                .map(function (res) { return res.json(); })
                .map(function (projects) { return _this.Projects = projects; })
                .catch(_this.handleError);
        };
        this.GetTasks = function () {
            return _this._http.get('http://localhost:58592/api/tasks')
                .map(function (res) { return res.json(); })
                .map(function (tasks) { return _this.Tasks = tasks; })
                .catch(_this.handleError);
        };
        this.actionUrl = 'http://localhost:58592/api/aspnetusers1';
    }
    DataService.prototype.PostTask = function (task) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this._http.post('http://localhost:58592/api/tasks', task, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe();
    };
    DataService.prototype.PutTask = function (task) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var id = task.Id;
        var url = 'http://localhost:58592/api/tasks/' + id;
        this._http.put(url, task, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe();
    };
    DataService.prototype.DeleteTask = function (task) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var id = task.Id;
        var url = 'http://localhost:58592/api/tasks/' + id;
        this._http.delete(url, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe();
    };
    DataService.prototype.handleError = function (error) {
        console.log('error');
        return Observable_1.Observable.throw(error.message || error);
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map