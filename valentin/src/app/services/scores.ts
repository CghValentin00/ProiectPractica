// src/app/services/scores.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Score } from '../models/score.model'; 

@Injectable({
  providedIn: 'root' 
})
export class ScoresService {
 
  private apiUrl = 'https://localhost:7277/api/scores'; 

  constructor(private http: HttpClient) { } 


  addScore(score: Score): Observable<Score> {
    console.log('Adding new score to backend:', score);
    return this.http.post<Score>(this.apiUrl, score); 
  }

  
  getHighScores(): Observable<Score[]> {
    console.log('Fetching high scores from backend:', `${this.apiUrl}/highscores`);
    return this.http.get<Score[]>(`${this.apiUrl}/highscores`);
  }
}


