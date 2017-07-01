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
var core_1 = require("@angular/core");
var classes_1 = require("./shared/classes");
var data_service_1 = require("./shared/data.service");
var task_world_component_1 = require("./task-world-component");
var Statuses = [
    "planning", "processing", "done"
];
var AppComponent = (function () {
    function AppComponent(_dataService) {
        this._dataService = _dataService;
        this.forEdit = false;
        this.toAdd = false;
        this.OriginalTasks = [];
        this.Tasks = [];
        this.Projects = [];
        this.tasks = [];
        this.showeditor = false;
        this.states = Statuses;
        this.taskStartTime = "2017-06-15";
        this.taskFinishTime = "2017-06-15";
        this.taskPredictedFinishTime = "2017-06-15";
        this.parentIsSet = false;
        this.selectedParent = "";
        this.userName = "";
        this.children = [];
        this.componentData = null;
    }
    AppComponent.prototype.createTaskComponent = function (task) {
        this.getMyChildren(task);
        this.componentData = {
            component: task_world_component_1.default,
            inputs: {
                tasks: this.children,
                Tasks: this.Tasks
            }
        };
    };
    AppComponent.prototype.getMyChildren = function (task) {
        this.children = [];
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].ParentTaskId == task.Id)
                this.children.push(this.Tasks[i]);
        }
    };
    AppComponent.prototype.saveChanges = function (task) {
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].Id == task.Id) {
                this.Tasks[i] = task;
            }
        }
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].Id == task.Id)
                this.tasks[i] = task;
        }
    };
    AppComponent.prototype.onSelect = function (project) {
        this.componentData = null;
        var m = new classes_1.Tasks();
        m.Title = "";
        m.Id = 1000000;
        m.ParentTaskId = 1000000;
        this.createTaskComponent(m);
        this.selectedParent = "";
        this.showeditor = false; //2
        this.tasks = [];
        this.selectedProject = project;
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].ProjectId == project.Id)
                this.tasks.push(this.Tasks[i]);
        }
    };
    AppComponent.prototype.getParent = function (parentid) {
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].Id == parentid) {
                return this.Tasks[i].Title;
            }
        }
        var parent = "";
        return parent;
    };
    AppComponent.prototype.getMystatus = function (task) {
        var s = "";
        if (task.StatusId == 3) {
            s = "planning";
        }
        else if (task.StatusId == 2) {
            s = "processing";
        }
        else if (task.StatusId == 1) {
            s = "done";
        }
        return s;
    };
    AppComponent.prototype.callType = function (value) {
        this.taskState = value;
    };
    AppComponent.prototype.callTypeParent = function (m) {
        this.taskParentTask = m;
    };
    AppComponent.prototype.setTaskP = function (task) {
        this.selectedParent = task.Title;
        this.parentIsSet = true;
    };
    AppComponent.prototype.showEditTask = function (Mytask) {
        this.forEdit = true;
        this.toAdd = false;
        this.taskTitle = Mytask.Title;
        if (Mytask.ParentTaskId) {
            this.taskParentTask = this.getParent(Mytask.ParentTaskId);
        }
        this.description = Mytask.Description;
        this.idiwka = Mytask.Id;
        if (Mytask.StartTime.length == 19)
            this.taskStartTime = Mytask.StartTime.substring(0, Mytask.StartTime.length - 9).toString();
        else
            this.taskStartTime = Mytask.StartTime;
        if (Mytask.FinishTime.length == 19)
            this.taskFinishTime = Mytask.FinishTime.substring(0, Mytask.FinishTime.length - 9).toString();
        else
            this.taskFinishTime = Mytask.FinishTime;
        if (Mytask.PredictedFinishTime.length == 19)
            this.taskPredictedFinishTime = Mytask.PredictedFinishTime.substring(0, Mytask.PredictedFinishTime.length - 9).toString();
        else
            this.taskPredictedFinishTime = Mytask.PredictedFinishTime;
        this.taskState = this.getMystatus(Mytask);
        this.showeditor = true;
    };
    AppComponent.prototype.showEditForTask = function (Mytask) {
        this.forEdit = true;
        this.toAdd = false;
        this.taskTitle = Mytask.Title;
        if (Mytask.ParentTaskId) {
            this.taskParentTask = this.getParent(Mytask.ParentTaskId);
        }
        this.description = Mytask.Description;
        this.idiwka = Mytask.Id;
        if (Mytask.StartTime.length == 19)
            this.taskStartTime = Mytask.StartTime.substring(0, Mytask.StartTime.length - 9).toString();
        else
            this.taskStartTime = Mytask.StartTime;
        if (Mytask.FinishTime.length == 19)
            this.taskFinishTime = Mytask.FinishTime.substring(0, Mytask.FinishTime.length - 9).toString();
        else
            this.taskFinishTime = Mytask.FinishTime;
        if (Mytask.PredictedFinishTime.length == 19)
            this.taskPredictedFinishTime = Mytask.PredictedFinishTime.substring(0, Mytask.PredictedFinishTime.length - 9).toString();
        else
            this.taskPredictedFinishTime = Mytask.PredictedFinishTime;
        this.taskState = this.getMystatus(Mytask);
        this.showeditor = true;
    };
    AppComponent.prototype.DeleteTask = function () {
        var t = new classes_1.Tasks();
        t = this.getMyTask(this.taskTitle);
        this._dataService.DeleteTask(t);
        var ind = this.Tasks.indexOf(t);
        this.Tasks.splice(ind, 1);
        ind = this.tasks.indexOf(t);
        this.tasks.splice(ind, 1);
        this.showeditor = false;
    };
    AppComponent.prototype.HideEditor = function () {
        this.showeditor = false;
    };
    AppComponent.prototype.getStatus = function (status) {
        var s;
        if (status == "planning")
            s = 3;
        else if (status == "done")
            s = 1;
        else if (status == "processing")
            s = 2;
        return s;
    };
    AppComponent.prototype.getIdForTask = function (parent) {
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].Title == parent)
                return this.Tasks[i].Id;
        }
    };
    AppComponent.prototype.saveTask = function (task) {
        task.Title = this.taskTitle;
        task.Description = this.description;
        task.FinishTime = this.taskFinishTime;
        task.PredictedFinishTime = this.taskPredictedFinishTime;
        task.StartTime = this.taskStartTime;
        if (this.getStatus(this.taskState))
            task.StatusId = this.getStatus(this.taskState);
        task.ProjectId = this.selectedProject.Id;
        if (this.getIdForTask(this.taskParentTask))
            task.ParentTaskId = this.getIdForTask(this.taskParentTask);
        return task;
    };
    AppComponent.prototype.saveItem = function () {
        var task = new classes_1.Tasks();
        task.Id = this.idiwka;
        task = this.saveTask(task);
        var s = new classes_1.States();
        s.Id = task.StatusId;
        s.State = this.taskState;
        task.States = s;
        this.saveChanges(task);
        this.OriginalTasks = this.Tasks;
        this._dataService.PutTask(task);
        this.Tasks = this.OriginalTasks;
        this.showeditor = false;
    };
    AppComponent.prototype.addItem = function () {
        var task = new classes_1.Tasks();
        task.Id = 0;
        task = this.saveTask(task);
        task.States = null;
        this.OriginalTasks = this.Tasks;
        this._dataService.PostTask(task);
        this.Tasks = this.OriginalTasks;
        var s = new classes_1.States();
        s.Id = task.StatusId;
        s.State = this.taskState;
        task.States = s;
        this.tasks.push(task);
        //if(this.Tasks.indexOf(task)>0)
        this.Tasks.push(task);
        this.showeditor = false;
    };
    AppComponent.prototype.htmlForTask = function (task) {
        var myhtml = "' <table class=\"table table-striped\">\n      <tbody><tr (click)=\"setParentTask(n,getMyTask(Myname))\"(dblclick)=\"showEditForTask(getMyTask(Myname))\">\n      <td #Myname>'+task.Title+\"</td> <td>\"+task.StartTime+\"</td>\n      <td>\"+task.FinishTime+\"</td><td>\"+task.States.State+'</td>\n      </tr><tr class=\"children\"#n></tr></tbody> </table>';";
        return myhtml;
    };
    AppComponent.prototype.setParentTask = function (task) {
        console.log("h " + task.Title);
        this.selectedParent = task.Title;
        this.parentIsSet = true;
    };
    AppComponent.prototype.editTask = function () {
        // then in parent task field we have to write its name.
        this.taskTitle = "";
        this.description = "";
        this.taskStartTime = "";
        this.taskFinishTime = "";
        this.taskParentTask = "";
        this.taskState = "done";
        this.taskPredictedFinishTime = "";
        this.forEdit = false;
        this.toAdd = true;
        this.showeditor = true;
        if (this.parentIsSet)
            this.taskParentTask = this.selectedParent;
        console.log("show editor");
    };
    AppComponent.prototype.getMyTask = function (name) {
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].Title == name)
                return this.Tasks[i];
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.GetTasks().subscribe(function (tasks) { return _this.Tasks = tasks; }, function (error) { return console.log(error || error.message); }, function () { return console.log('Got all tasks'); });
        this._dataService
            .GetProjects()
            .subscribe(function (projects) { return _this.Projects = projects; }, function (error) { return console.log(error || error.message); }, function () { return console.log('Got all projects'); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map