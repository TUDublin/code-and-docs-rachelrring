import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Budget {
  email: string;
  income: number;
  expenses: number;
}


@Component({
  selector: 'app-data-visualisations',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-visualisations.component.html',
  styleUrl: './data-visualisations.component.css'
})
export class DataVisualisationsComponent implements OnInit {
  public budgets: Budget[] = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    // this.http.get<Budget[]>('https://localhost:7050/api/Budgets').subscribe(
    //   (result) => {
    //     this.budgets = result;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    // console.log(this.budgets);
  }
}
