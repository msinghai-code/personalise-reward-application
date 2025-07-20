import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  users: any[] = [];
  selectedUserId = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('players') || '[]');
    if (this.users.length === 0) {
      this.users = [
        { player_id: 'user_001', name: 'Priya' },
        { player_id: 'user_002', name: 'Rahul' },
        { player_id: 'user_003', name: 'Liam' }
      ];
      localStorage.setItem('players', JSON.stringify(this.users));
    }  
  }

  login() {
    if (this.selectedUserId) {
      localStorage.setItem('currentUser', this.selectedUserId);
      this.router.navigate(['/dashboard']);
    }
  }
}
