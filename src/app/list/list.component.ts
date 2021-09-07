import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from '../models/inventory';
import { CategoryService } from '../services/category.service';
import {MatDialog} from '@angular/material/dialog';


// Import edit component and use it as a dialog
import { EditComponent } from '../edit/edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ELEMENT_DATA: Inventory[] = [];
  dataSource = new MatTableDataSource<Inventory>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'CategoryName', 'Description', 'Quantity', 'InStock', 'DateReceived', 'Action'];

  constructor(public dialog: MatDialog, private cService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllStock();
  }

  openDialog() {
    console.log()
    const dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateTo(data:any) {
    this.openDialog();
  }

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
