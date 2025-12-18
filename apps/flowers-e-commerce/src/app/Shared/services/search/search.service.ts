import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTerm = signal<string>('');

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

}
