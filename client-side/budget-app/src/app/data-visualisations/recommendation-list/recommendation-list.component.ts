import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationLinks } from './expense-recommendations';

@Component({
  selector: 'app-recommendation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation-list.component.html',
  styleUrl: './recommendation-list.component.css'
})
export class RecommendationListComponent implements OnInit {
  @Input() expenseName = '';

  public links:{ title: string; link: string; }[] = [];

  ngOnInit(): void {
    const l = RecommendationLinks.find(x => x.expenseName == this.expenseName)?.links;
    this.links = l || [];
  }
}
