import { Component, Input } from '@angular/core';


@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: any[] = [];
  @Input() subjectName: string = '';

  // Pagination properties
  itemsPerPage = 10;
  currentPage = 1;
  offset = 0;

  get paginatedItems(): any[] {
    const startIndex = this.offset;
    const endIndex = startIndex + this.itemsPerPage;
    return this.booksList.slice(startIndex, endIndex);
  }

  // Pagination methods
  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.offset += this.itemsPerPage;
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.offset -= this.itemsPerPage;
      this.currentPage--;
    }
  }

  get currentRange(): string {
    const startIndex = this.offset + 1;
    const endIndex = Math.min(this.offset + this.itemsPerPage, this.booksList.length);
    return `Showing ${startIndex} to ${endIndex} of ${this.booksList.length} entries`;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.offset = (page - 1) * this.itemsPerPage;
  }

  setItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.offset = 0;
    this.currentPage = 1;
  }

  get pageCount(): number {
    if (this.itemsPerPage > 0) {
      return Math.ceil(this.booksList.length / this.itemsPerPage);
    } else {
      return 0;
    }
  }

  get pages(): number[] {
    const pageCount = this.pageCount;
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    return pages;
  }

  ngOnInit() {
    // Initialize the current page to 1
    this.currentPage = 1;
  }
}
