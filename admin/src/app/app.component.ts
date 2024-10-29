import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 

// Define a TypeScript interface for Car
interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kilometers: number;
  fuel: string;
  consumption: number;
  description: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HttpClientModule, CommonModule],
})
export class AppComponent {
  cars: Car[] = []; 
  loading: boolean = false; 
  errorMessage: string | null = null;  // To store error messages

  constructor(private http: HttpClient) {
    this.fetchCars(); // Fetch cars on component initialization
  }

  fetchCars() {
    this.loading = true; 
    this.errorMessage = null;  // Reset error message
    this.http.get<{ cars: Car[] }>('http://localhost:8000/api/cars').subscribe(
      response => {
        this.cars = response.cars; // Access the cars array
        this.loading = false; 
        console.log('Data retrieved:', this.cars);
      },
      error => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Failed to fetch car data. Please try again later.'; // Set error message
        this.loading = false; 
      }
    );
  }
  
  deleteCar(carId: string) {
    if (confirm('Are you sure you want to delete this car?')) { // Confirm deletion
      this.http.delete(`http://localhost:8000/api/cars/${carId}`).subscribe(
        response => {
          console.log('Car deleted successfully:', response);
          this.cars = this.cars.filter(car => car._id !== carId);
        },
        error => {
          console.error('Error deleting car:', error);
          this.errorMessage = 'Failed to delete the car. Please try again.'; // Set error message
        }
      );
    }
  }
}
