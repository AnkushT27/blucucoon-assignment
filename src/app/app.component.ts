import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AppService } from './app.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  task:Array<String>;
  tasksSelected:Array<String>;
  constructor(private taskService:AppService){
    this.task=[];
    this.tasksSelected = [];
  }
 
  ngOnInit(): void {
    this.getTasks()
  }
  title = 'assignment-frontend';
  
  getTasks(){
    //to unsubscribe after one stream is initiated
    this.taskService.getData().pipe(take(1)).subscribe(({data}:any)=>{
        this.task = data;
    })
  }

  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.task, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.moviesSelected, event.previousIndex, event.currentIndex);
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
