import { Routes } from '@angular/router';
import { Game } from './game/game';
import { Home } from './home/home';


export const routes: Routes = [
    {path: '', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component:Home},
    { path: 'game/:playerName', component:Game },
];
