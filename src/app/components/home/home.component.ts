import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { BooksService } from 'src/app/core/services/books.service';



@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchResults: any[] = [];
  isLoading: boolean = false;
  
  constructor(private booksService: BooksService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  getSearchResults(value: string) {
    this.isLoading = true; // Set isLoading to true before starting the search
  
    if (!value.trim()) {
      this.searchResults = []; // Set searchResults to an empty array if the search string is empty
      this.isLoading = false; // Set isLoading back to false immediately
      return;
    }
  
    this.booksService.searchBooks(value).subscribe((results: Array<any>) => {
      this.searchResults = results;
      this.isLoading = false; // Set isLoading back to false when the search is complete
      console.log(this.searchResults);
    });
  };

  clearSearch(): void {
    this.bookSearch.setValue(''); // Clear the search input by setting its value to an empty string
    this.searchResults = []; // Clear the search results array
  }
  

  ngOnInit(): void {
  this.bookSearch.valueChanges
    .pipe(
      debounceTime(1000),
      // Add a distinctUntilChanged operator to ensure that the same search value is not emitted multiple times in a row
      distinctUntilChanged(),
      // Use the map operator to transform the search value to an empty string when it is falsy
      map((value: string) => value.trim() ? value : ''),
    )
    .subscribe((value: string) => {
      this.getSearchResults(value);   
    });
}

}