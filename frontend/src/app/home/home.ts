import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true
})
export class Home {
  constructor(private router: Router) {}

  playAsGuest() {
    let random =Math.floor(Math.random()*100000)
    this.router.navigate(['/game', 'guest'+random]);
    
  }
  
  

  onEnter(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter' && input.trim()) {
      this.router.navigate(['/game', input.trim()]);
    }
  }
}