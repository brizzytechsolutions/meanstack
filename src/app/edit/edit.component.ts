import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  durationInSeconds = 5;
  // editForm!: FormGroup;
  editForm = new FormGroup({
    CategoryName: new FormControl(''),
    Description: new FormControl(''),
    Quantity: new FormControl(''),
    InStock: new FormControl(''),
    DateReceived: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private cService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.warn(this.route.snapshot.params.id);
    this.cService.getById(this.route.snapshot.params.id).subscribe((res) => {
      console.warn("Get by Id Working", res);
      this.editForm = new FormGroup({
        CategoryName: new FormControl(res['CategoryName']),
        Description: new FormControl(res['Description']),
        Quantity: new FormControl(res['Quantity']),
        InStock: new FormControl(res['InStock'])
      });
    });
  }

  onSubmit() {
    try {
      this.cService.update(this.route.snapshot.params.id, this.editForm.value).subscribe((res) => {
        this.router.navigate(['/list']);
      })
    } catch (error) {
      console.log('Failed to update!', error);
    }
  }

  openSnackBar() {
    this.snack.open('Your data was successfully updated!', 'Updated', {
      duration: 3000
    });
  }
}

