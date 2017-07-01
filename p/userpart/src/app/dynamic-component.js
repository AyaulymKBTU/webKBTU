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
var task_world_component_1 = require("./task-world-component");
var DynamicComponent = (function () {
    function DynamicComponent(resolver) {
        this.resolver = resolver;
        this.currentComponent = null;
        this.selParent = new core_1.EventEmitter();
        this.parIsSet = new core_1.EventEmitter();
    }
    DynamicComponent.prototype.setParentTask = function (e) {
        console.log("iam at dyn");
        this.selParent.emit(e);
    };
    DynamicComponent.prototype.showEditForTask = function (e) {
        console.log("iam at dyn");
        this.parIsSet.emit(e);
    };
    Object.defineProperty(DynamicComponent.prototype, "componentData", {
        set: function (data) {
            if (!data) {
                return;
            }
            var inputProviders = Object.keys(data.inputs).map(function (inputName) { return { provide: inputName, useValue: data.inputs[inputName] }; });
            var resolvedInputs = core_1.ReflectiveInjector.resolve(inputProviders);
            var injector = core_1.ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
            var factory = this.resolver.resolveComponentFactory(data.component);
            var component = factory.create(injector);
            this.dynamicComponentContainer.insert(component.hostView);
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }
            this.currentComponent = component;
        },
        enumerable: true,
        configurable: true
    });
    return DynamicComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DynamicComponent.prototype, "selParent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DynamicComponent.prototype, "parIsSet", void 0);
__decorate([
    core_1.ViewChild('dynamicComponentContainer', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], DynamicComponent.prototype, "dynamicComponentContainer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DynamicComponent.prototype, "componentData", null);
DynamicComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-component',
        entryComponents: [task_world_component_1.default],
        template: "\n    <div #dynamicComponentContainer  (selectedParent)=\"setParentTask($event)\" (parentIsSet)=\"showEditForTask($event)\"></div>\n  ",
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], DynamicComponent);
exports.default = DynamicComponent;
//# sourceMappingURL=dynamic-component.js.map