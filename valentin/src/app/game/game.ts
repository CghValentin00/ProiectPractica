import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{DOCUMENT} from '@angular/common';



@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css'
})

export class Game implements OnInit {
  playerName ="";
 snake = new Snake(5,5);
 intervalId:any;
 
 

 constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document:Document) {
  this.route.params.subscribe(params => {
    this.playerName = params['playerName'];
  });
 }

 ngOnInit(): void {
  
   this.intervalId=setInterval(()=>{
    const play = this.snake.move();
    if(!play){
      clearInterval(this.intervalId);
      return; 
    }
    if(this.snake.eatItself()){
      clearInterval(this.intervalId);
    }
    this.drawSnake();
    this.checkFruitCollision();
   },200);
 }

  placeFruit():void{
 const food = this.document.getElementById('fruit');
 if(!food) return;
  const maxX = 25;
  const maxY = 25;

  const x=Math.floor(Math.random()*maxX) * 20;
  const y=Math.floor(Math.random()*maxY)* 20;


  food.style.left = x +'px';
  food.style.top = y+'px';
  food.style.backgroundColor = 'orange';



}
 
drawSnake(): void {
  const grid = this.document.getElementById('grid');
  
  if (!grid) return;
grid.querySelectorAll('.snake-segment').forEach(seg => seg.remove());
grid.querySelectorAll('.snake').forEach(seg => seg.remove());

for (let i = 0; i < this.snake.body.length; i++) {
  const segment = this.snake.body[i];
  const snakeElem = this.document.createElement('div');

  Object.assign(snakeElem.style, {
    position: 'absolute',
    width: '20px',
    height: '20px',
    left: `${segment.x * 20}px`,
    top: `${segment.y * 20}px`,
    backgroundColor: i === 0 ? 'red' : 'green',
    borderRadius: '50%'
  });

  snakeElem.className = 'snake-segment';
  this.document.getElementById('grid')?.appendChild(snakeElem);
}

  
}

checkFruitCollision(): void {
  const food = this.document.getElementById('fruit');
  if (!food) return;

  const x = Math.floor(food.offsetLeft / 20);
  const y = Math.floor(food.offsetTop / 20);
  const head = this.snake.body[0];

  if (head.x === x && head.y === y) {
    this.snake.score++
    const tail = this.snake.body[this.snake.body.length - 1];
    this.snake.body.push({ x: tail.x, y: tail.y }); 
    this.placeFruit(); 
    this.drawSnake();  
  }
 
  
  console.log(this.snake.score);
}



  


@HostListener('window:keydown', ['$event'])
  handleKey(event:KeyboardEvent): void{
    switch(event.key){
      case 'ArrowUp' : this.snake.setDirection('up');break;
      case 'ArrowDown':  this.snake.setDirection('down'); break;
      case 'ArrowLeft':  this.snake.setDirection('left'); break;
      case 'ArrowRight': this.snake.setDirection('right'); break;
    }
  }
}


class Snake {
  body :{x:number; y:number}[];
  direction : 'up' |'down'|'left'|'right';
  speed: number;
  head:number;
  score:number;

  constructor(startX:number, startY:number){
      this.body = [{x:startX, y:startY}];
      this.direction = 'right';
      this.speed = 1;
      this.head = startX;
      this.score = 0;
  }

  move(): boolean{
    const WIDTH = 25;
    const HEIGHT = 25;
    const head = {...this.body[0]};
    switch(this.direction){
      case 'up' :head.y -=this.speed;break;
      case 'down' : head.y +=this.speed;break;
      case 'right' : head.x +=this.speed;break;
      case 'left' : head.x -=this.speed;break;
       }

if(head.x >= WIDTH || head.x <0 || head.y >HEIGHT || head.y<0){
   return false;
}

    this.body.unshift(head);
    this.body.pop();
       return true;
  }

  setDirection(newDirection:'up'|'down'|'left'|'right'):void{
    
    const opposite ={
      up :'down',
      down:'up',
      left:'right',
      right:'left'
    };
    if(newDirection !== opposite[this.direction]){

      this.direction  = newDirection;  
    }  
  }
  eatItself(): boolean{
      let head = this.body[0];
      for(let i = 1; i<this.body.length;i++){
        let segment = this.body[i]
      if(segment.y === head.y && segment.x === head.x)
        return true
  }

  return false;
}
}



