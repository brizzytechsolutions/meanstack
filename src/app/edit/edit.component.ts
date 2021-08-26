import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cService.getById(this.route.snapshot.params.id).subscribe((res) => {
      // console.log(res);
      this.editForm = this.fb.group({
        CategoryName: res['CategoryName'],
        Description: res['Description'],
        Quantity: res['Quantity'],
        InStock: res['InStock'],
        DateReceived: res['DateReceived']
      })
    })
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

}
