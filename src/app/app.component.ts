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
  movies:Array<String>;
  moviesSelected:Array<String>;
  constructor(private taskService:AppService){
    this.movies=[];
    this.moviesSelected = [];
  }
 
  ngOnInit(): void {
    this.getTasks()
  }
  title = 'assignment-frontend';
  
  getTasks(){
    //to unsubscribe after one stream is initiated
    this.taskService.getData().pipe(take(1)).subscribe(({data}:any)=>{
        this.movies = data;
    })
  }

  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    //moveItemInArray(this.moviesSelected, event.previousIndex, event.currentIndex);
    this.reorderData();
    
  }

  eventCheck(event:any,i:number){
    if(event.target.checked){
      this.moviesSelected.push(this.movies[i]);
      this.reorderData();
    }
    else{
    this.moviesSelected = this.moviesSelected.filter((data)=>{
       return data!=this.movies[i]
      })
    }
  }

  reorderData(){
    this.moviesSelected = this.movies.filter((data)=>this.moviesSelected.includes(data))
  }
}
