import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Inventory } from '../models/inventory';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Access-Control-Allow-Origin': ''
    })
  }

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Inventory[]>{
    return this.http.get<Inventory[]>(this.baseUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id: number): Observable<Inventory> {
    const url = `${this.baseUrl}/{id}`;
    return this.http.get<Inventory>(url, this.headerOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(inventory: Inventory): Observable<Inventory> {
    // const url = `${this.baseUrl}/${create}`
    return this.http.post<Inventory>(this.baseUrl + '/create/', inventory, this.headerOptions)
    // return this.http.post<Inventory>(url, inventory, this.headerOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(this.baseUrl + '/id/', inventory, this.headerOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id: number): Observable<Inventory> {
    const url = `${this.baseUrl}/{id}`;
    return this.http.delete<Inventory>(url, this.headerOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  search(CategoryName: string): Observable<Inventory[]>{
    const url = `${this.baseUrl}/?CategoryName=${CategoryName}`;
    return this.http.get<Inventory[]>(url, this.headerOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
