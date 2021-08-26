import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  submitted = false;
  inventoryForm!: FormGroup;

  constructor(
    private cService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm();
  }

  myForm() {
    this.inventoryForm = this.fb.group({
      CategoryName: [''],
      Description: [''],
      Quantity: [''],
      InStock: [''],
      DateReceived: ['']
    })
  }

  onSubmit() {
    this.submitted = true;
    try {
      this.cService.create(this.inventoryForm.value).subscribe((res) => {
        console.log('Successfully submitted the form!');
        this.router.navigateByUrl('/list');
      })
    } catch (error) {
      console.log('Falied to submit', error);
    }
  }
}
