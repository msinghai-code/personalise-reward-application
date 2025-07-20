import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Rewards {
  private players = [
    { player_id: 'user_001', name: 'Priya' },
    { player_id: 'user_002', name: 'Rahul' },
    { player_id: 'user_003', name: 'Liam' }
  ];

  private activityData: any = {
    user_001: { sessions: 2, sessionLength: 15, logins: 3, deposits: 1, depositAmt: 50, referrals: 0, rg: 1, activeDays: 2, redemptions: 0, products: ['sports'] },
    user_002: { sessions: 20, sessionLength: 25, logins: 25, deposits: 4, depositAmt: 400, referrals: 1, rg: 1, activeDays: 12, redemptions: 3, products: ['sports', 'casino'] },
    user_003: { sessions: 10, sessionLength: 30, logins: 15, deposits: 5, depositAmt: 1000, referrals: 0, rg: 1, activeDays: 5, redemptions: 2, products: ['sports'] }
  };

  constructor() {
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  getPlayerName(userId: string): string {
    return this.players.find(p => p.player_id === userId)?.name || '';
  }

  getLQ(userId: string): number {
    const d = this.activityData[userId];
    const norm = {
      sessions: d.sessions / 30,
      sessionLength: d.sessionLength / 30,
      logins: d.logins / 30,
      deposits: d.deposits / 5,
      depositAmt: d.depositAmt / 500,
      referrals: d.referrals / 2,
      rg: d.rg,
      activeDays: d.activeDays / 15,
      redemptions: d.redemptions / 5,
      products: d.products.length / 2
    };
    const lq = (0.15 * norm.sessions) + (0.10 * norm.sessionLength) + (0.15 * norm.logins) +
               (0.15 * norm.deposits) + (0.10 * norm.depositAmt) + (0.10 * norm.referrals) +
               (0.15 * norm.rg) + (0.15 * norm.activeDays) + (0.10 * norm.redemptions) + (0.05 * norm.products);
    return Math.round(lq * 100);
  }

  getRewards(userId: string): any[] {
    const lq = this.getLQ(userId);
    const d = this.activityData[userId];
    const rewards = [];

    if (lq < 30 && d.rg) {
      rewards.push({ title: '₹500 Free Bet', reason: 'Welcome Bonus for New Player' });
    }
    if (lq >= 50 && d.products.includes('casino') && d.rg) {
      rewards.push({ title: '10 Free Spins', reason: 'Casino Engagement Bonus' });
    }
    if (lq >= 60 && d.products.length >= 2 && d.rg) {
      rewards.push({ title: '₹100 Free Bet', reason: 'Cross-Product Engagement Reward' });
    }
    if (lq >= 40 && d.rg && d.logins < 5) {
      rewards.push({ title: 'Mystery Box', reason: 'Dormant Player Re-engagement' });
    }
    if (lq >= 70 && d.depositAmt >= 500 && d.rg) {
      rewards.push({ title: '₹1000 Cashback', reason: 'High Deposit Reward' });
    }

    return rewards;
  }
}
