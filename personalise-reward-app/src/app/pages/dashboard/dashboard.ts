import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Rewards } from '../../services/rewards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  userId = '';
  playerName = '';
  lq = 0;
  rewards: any[] = [];

  constructor(private router: Router, private rewardsService: Rewards) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('currentUser') || '';
    this.playerName = this.rewardsService.getPlayerName(this.userId);
    this.lq = this.rewardsService.getLQ(this.userId);
    this.rewards = this.rewardsService.getRewards(this.userId);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}

