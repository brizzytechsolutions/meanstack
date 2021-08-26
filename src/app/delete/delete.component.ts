import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  deleteData!: FormGroup;

  constructor(
    private cService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cService.getById(this.route.snapshot.params.id).subscribe((res) => {
      this.deleteData = this.fb.group({
        CategoryName: res['CategoryName'],
        Description: res['Description'],
        Quantity: res['Quantity'],
        InStock: res['InStock'],
        DateReceived: res['DateReceived']
      })
    })
  }

  onSubmit(id: any) {
    try {
      this.cService.delete(id).subscribe((res) => {
        this.router.navigate(['/list']);
      })
    } catch (error) {
      console.log('Failed to delete', error);
    }
  }

}
