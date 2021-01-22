import { Component, OnDestroy, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AppService } from './app.service';
import { take, timeout } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  task:Array<String>;
  tasksSelected:Array<String>;
  subscription:Subscription;
  errorFlag:Boolean;
  constructor(private taskService:AppService){
    this.task=[];
    this.tasksSelected = [];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
 
  ngOnInit(): void {
    this.getTasks()
  }
  title = 'assignment-frontend';
  
  getTasks(){
    //to unsubscribe after one stream is initiated
    //added a timeout set to 10 seconds if api fails to respond would fallback into the err callback
    this.subscription = this.taskService.getData().pipe(take(1),timeout(10000)).subscribe(({data}:any)=>{
        this.task = data;
    },(err)=>{
        this.errorFlag=true;
    })
  }

  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.task, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.tasksSelected, event.previousIndex, event.currentIndex);
    this.reorderData();
    
  }

  eventCheck(event:any,i:number){
    if(event.target.checked){
      this.tasksSelected.push(this.task[i]);
      this.reorderData();
    }
    else{
    this.tasksSelected = this.tasksSelected.filter((data)=>{
       return data!=this.task[i]
      })
    }
  }

  reorderData(){
    this.tasksSelected = this.task.filter((data)=>this.tasksSelected.includes(data))
  }
}
