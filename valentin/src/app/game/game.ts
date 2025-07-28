import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, CommonModule } from '@angular/common';
import { ScoresService, } from '../services/scores';
import { FormsModule } from '@angular/forms';
import {Score} from '../models/score.model'

class Snake {
  body: { x: number; y: number }[];
  direction: 'up' | 'down' | 'left' | 'right';
  speed: number;
  head: number;

  constructor(startX: number, startY: number) {
    this.body = [{ x: startX, y: startY }];
    this.direction = 'right';
    this.speed = 1;
    this.head = startX;
  }

  move(): boolean {
    const WIDTH = 25;
    const HEIGHT = 25;
    const head = { ...this.body[0] };
    switch (this.direction) {
      case 'up':
        head.y -= this.speed;
        break;
      case 'down':
        head.y += this.speed;
        break;
      case 'right':
        head.x += this.speed;
        break;
      case 'left':
        head.x -= this.speed;
        break;
    }

    if (head.x >= WIDTH || head.x < 0 || head.y >= HEIGHT || head.y < 0) {
      return false;
    }

    this.body.unshift(head);
    this.body.pop();
    return true;
  }

  setDirection(newDirection: 'up' | 'down' | 'left' | 'right'): void {
    const opposite: { [key: string]: string } = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    };
    if (newDirection !== opposite[this.direction]) {
      this.direction = newDirection;
    }
  }

  eatItself(): boolean {
    let head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      let segment = this.body[i]
      if (segment.y === head.y && segment.x === head.x)
        return true
    }
    return false;
  }
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game implements OnInit {
  playerName: string = "";
  snake = new Snake(5, 5);
  intervalId: any;
  currentScore: number = 0;
  isGameOver: boolean = false;

  highScores: Score[] = [];
  loadingScores: boolean = false;
  scoreError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private scoresService: ScoresService
  ) {
    this.route.params.subscribe(params => {
      this.playerName = params['playerName'];
    });
  }

  ngOnInit(): void {
    this.loadHighScores();
    this.startGameLoop();
    this.placeFruit();
  }

  startGameLoop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isGameOver = false;
    this.currentScore = 0;
    this.snake = new Snake(5, 5);
    this.drawSnake();

    this.intervalId = setInterval(() => {
      const moved = this.snake.move();
      const ateItself = this.snake.eatItself();

      if (!moved || ateItself) {
        clearInterval(this.intervalId);
        this.isGameOver = true;
        console.log("GAME OVER!");
        console.log("Final Score:", this.currentScore);
        console.log("Player Name:", this.playerName);
        this.saveScore();
        return;
      }
      this.drawSnake();
      this.checkFruitCollision();
    }, 200);
  }

  restartGame(): void {
    this.startGameLoop();
    this.placeFruit();
  }

  placeFruit(): void {
    const food = this.document.getElementById('fruit');
    if (!food) return;
    const maxX = 25;
    const maxY = 25;

    const x = Math.floor(Math.random() * maxX) * 20;
    const y = Math.floor(Math.random() * maxY) * 20;

    food.style.left = x + 'px';
    food.style.top = y + 'px';
    food.style.backgroundColor = 'orange';
  }

  drawSnake(): void {
    const grid = this.document.getElementById('grid');
    if (!grid) return;
    grid.querySelectorAll('.snake-segment').forEach(seg => seg.remove());

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
      const tail = this.snake.body[this.snake.body.length - 1];
      this.snake.body.push({ x: tail.x, y: tail.y });
      this.placeFruit();
      this.currentScore++;
      this.drawSnake();
    }
  }

  saveScore(): void {
    if ( this.currentScore > 0) {
      const newScore: Score = {
        username: this.playerName,
        score: this.currentScore,
        timestamp: new Date()
      };

      this.scoresService.addScore(newScore).subscribe({
        next: (response) => {
          console.log('Score saved successfully:', response);
          this.loadHighScores();
        },
        error: (err) => {
          console.error('Error saving score:', err);
          this.scoreError = 'Esec la salvarea scorului. Te rugam sa incerci din nou.';
        }
      });
    } else {
      console.log('Scorul nu a fost salvat: Numele de utilizator lipseste sau scorul este zero.');
    }
  }

  loadHighScores(): void {
    this.loadingScores = true;
    this.scoreError = null;
    this.scoresService.getHighScores().subscribe({
      next: (data) => {
        this.highScores = data;
        this.loadingScores = false;
      },
      error: (err) => {
        console.error('Failed to load high scores:', err);
        this.scoreError = 'Esec la incarcarea scorurilor mari. Verifica conexiunea API si CORS.';
        this.loadingScores = false;
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent): void {
    if (!this.isGameOver) {
      switch (event.key) {
        case 'ArrowUp':
          this.snake.setDirection('up');
          break;
        case 'ArrowDown':
          this.snake.setDirection('down');
          break;
        case 'ArrowLeft':
          this.snake.setDirection('left');
          break;
        case 'ArrowRight':
          this.snake.setDirection('right');
          break;
      }
    }
  }
}
