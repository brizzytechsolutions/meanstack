import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailsForm!: FormGroup

  constructor(
    private cService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cService.getById(this.route.snapshot.params.id).subscribe((res) => {
      this.detailsForm = this.fb.group({
        CategoryName: res['CategoryName'],
        Description: res['Description'],
        Quantity: res['Quantity'],
        InStock: res['InStock'],
        DateReceived: res['DateReceived']
      })
    })
  }

  onBack() {
    this.router.navigate(['/list']);
  }

}
