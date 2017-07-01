import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver,Output,EventEmitter} from '@angular/core';
import TaskWorldComponent from './task-world-component';


@Component({
  selector: 'dynamic-component',// dynamic-component,
  entryComponents: [TaskWorldComponent], 
  template: `
    <div #dynamicComponentContainer  (selectedParent)="setParentTask($event)" (parentIsSet)="showEditForTask($event)"></div>
  `,
})
export default class DynamicComponent {
  currentComponent:any = null;
   @Output() selParent=new EventEmitter();
  @Output()  parIsSet=new EventEmitter();
 setParentTask(e:any)
 {
   console.log("iam at dyn");
   this.selParent.emit(e);
 }
 showEditForTask(e:any)
 {
    console.log("iam at dyn");
   this.parIsSet.emit(e);
 }
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
  @Input() set componentData(data: {component: any, inputs: any }) {
    if (!data) {
      return;
    }
    let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
    let factory = this.resolver.resolveComponentFactory(data.component);
    let component = factory.create(injector);
    this.dynamicComponentContainer.insert(component.hostView);
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    
    this.currentComponent = component;
  }
  
  constructor(private resolver: ComponentFactoryResolver) {
    
  }
}
