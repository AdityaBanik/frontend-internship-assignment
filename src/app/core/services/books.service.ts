import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private cache: { [key: string]: any } = {};

  constructor(private apiService: ApiService) {}

  searchBooks(searchString: string): Observable<any> {
    if (this.cache[searchString]) {
      // If the search string is already cached, return the cached result
      return of(this.cache[searchString]);
    } else {
      // If the search string is not cached, make an HTTP request to fetch the results
      const url = `/search.json?q=${searchString}`;
      return this.apiService.get<any>(url).pipe(
        map(response => {
          const result = response['docs'];
          this.cache[searchString] = result; // Store the result in the cache
          return result;
        }),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
    }
  }
}
