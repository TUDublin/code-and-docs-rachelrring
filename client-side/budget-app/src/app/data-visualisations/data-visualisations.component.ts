import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AvgEarningsResponseDTO } from './CSOData/CSOData';

@Component({
  selector: 'app-data-visualisations',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './data-visualisations.component.html',
  styleUrl: './data-visualisations.component.css'
})
export class DataVisualisationsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public data!: AvgEarningsResponseDTO;

  ngOnInit(): void {
    this.http.get<AvgEarningsResponseDTO>(environment.goUrlAddress).subscribe(
      {
        next: (res:AvgEarningsResponseDTO) => {
          console.log("It Worked!");
          console.log(res);
          this.data = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
