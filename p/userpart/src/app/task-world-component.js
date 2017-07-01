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
var TaskWorldComponent = TaskWorldComponent_1 = (function () {
    function TaskWorldComponent(injector) {
        this.injector = injector;
        this.Title = "";
        this.tasks = [];
        this.Tasks = [];
        this.children = [];
        this.componentData = null;
        this.selectedParent = new core_1.EventEmitter();
        this.parentIsSet = new core_1.EventEmitter();
        this.tasks = this.injector.get('tasks');
        this.Tasks = this.injector.get('Tasks');
        if (this.tasks.length > 0) {
            if (this.tasks[0].ParentTaskId) {
                this.Title = this.getPapa(this.tasks[0].ParentTaskId);
            }
        }
    }
    TaskWorldComponent.prototype.setParentTask = function (mytask) {
        this.selectedParent.emit(mytask);
    };
    TaskWorldComponent.prototype.showEditForTask = function (mytask) {
        this.parentIsSet.emit(mytask);
    };
    TaskWorldComponent.prototype.getMyChildren = function (task) {
        this.children = [];
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].ParentTaskId == task.Id)
                this.children.push(this.Tasks[i]);
        }
    };
    TaskWorldComponent.prototype.getPapa = function (id) {
        for (var i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].Id == id) {
                return this.Tasks[i].Title;
            }
        }
        var parent = "";
        return parent;
    };
    TaskWorldComponent.prototype.createTaskComponent = function (task) {
        if (task.ParentTaskId) {
            this.getMyChildren(task);
        }
        this.componentData = {
            component: TaskWorldComponent_1,
            inputs: {
                tasks: this.children
            }
        };
    };
    return TaskWorldComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TaskWorldComponent.prototype, "selectedParent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TaskWorldComponent.prototype, "parentIsSet", void 0);
TaskWorldComponent = TaskWorldComponent_1 = __decorate([
    core_1.Component({
        selector: 'task-world',
        styleUrls: ['./app.component.css'],
        template: "\n  <p style=\"background-color: #f1f1f1\">{{Title}}</p>\n     <div *ngFor=\"let Mytask of tasks\">\n                        <thead></thead>\n                        <tbody>\n                            <tr  (click)=\"setParentTask(Mytask)\" (dblclick)=\"showEditForTask(Mytask)\" >\n                                <td>{{Mytask.Title}}</td>\n                                <td>{{Mytask.StartTime}}</td>\n                                <td>{{Mytask.FinishTime}}</td>\n                                <td>{{Mytask.States.State}}</td>\n                                <td> <button (click)=\"createTaskComponent(Mytask)\">SubTasks</button>\n                                <td>\n                            </tr>\n                        </tbody>    \n                    </div>\n                    <dynamic-component [componentData]=\"componentData\"></dynamic-component>\n  ",
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], TaskWorldComponent);
exports.default = TaskWorldComponent;
var TaskWorldComponent_1;
//# sourceMappingURL=task-world-component.js.map