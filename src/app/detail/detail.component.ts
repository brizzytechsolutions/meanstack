import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventory } from '../models/inventory';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  inventory!: Inventory;
  id!: number

  constructor(
    private cService: CategoryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cService.getById(this.route.snapshot.params.id).subscribe((data: Inventory) => {
      this.inventory = data;
    });
  }

}
