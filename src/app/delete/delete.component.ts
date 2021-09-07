import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../models/inventory';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  inventory!: Inventory;
  id!: number

  constructor(
    private cService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cService.getById(this.route.snapshot.params.id).subscribe((res: Inventory) => {
      this.inventory = res;
    })
  }

  onSubmit() {
    try {
      this.cService.delete(this.route.snapshot.params.id).subscribe((res) => {
        console.warn('Deleted', res);
        this.router.navigate(['/list']);
      })
    } catch (error) {
      console.log('Failed to delete', error);
    }
  }

  openSnackBar() {
    this.snack.open('You\'ve successfully deleted the data item', 'Deleted', {
      duration: 3000
    });
  }

}
