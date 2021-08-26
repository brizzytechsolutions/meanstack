import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from '../models/inventory';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ELEMENT_DATA: Inventory[] = [];
  dataSource = new MatTableDataSource<Inventory>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'CategoryName', 'Description', 'Quantity', 'InStock', 'DateReceived', 'Action'];

  constructor(
    private cService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllStock();
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  getAllStock(){
      try {
        this.cService.getAll().subscribe((data) => {
          this.dataSource.data = data as Inventory[];
          console.log(this.dataSource.data);
        })
      } catch (error) {
        console.log('Failed to fetch list', error);
      }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
