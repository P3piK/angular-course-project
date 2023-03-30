import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() changeView = new EventEmitter<string>();

  constructor(
    private dataStorageService: DataStorageService
  ) {}

  onSwitchView(viewName: string): void {
    this.changeView.emit(viewName);
  }

  onStoreData() {
    this.dataStorageService.storeData();
  }

  onFetchData() {
    this.dataStorageService.fetchData();
  }
}
