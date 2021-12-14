import {Component, OnInit} from '@angular/core';
import {SpotService} from "../../../../core/services/spot.service";
import {SpotModel} from "../../../../core/models/spot.model";
import {v4 as uuidv4} from "uuid";
import {SpotStatusEnum} from "../../../../core/models/spot-status.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-spots',
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.scss']
})
export class SpotsComponent implements OnInit {

  spots: SpotModel[] = [];

  constructor(
    private spotService: SpotService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.spots = this.spotService.findAll();
  }

  addSpot() {
    const spot = {
      id: uuidv4(),
      seats: 4,
      orders: [],
      status: SpotStatusEnum.FREE
    } as SpotModel;

    this.spots.push(spot);
    this.spotService.createAll(this.spots);
  }

  onSpotClick(spot: SpotModel): void {
    this.router.navigate(['spots',spot.id]);
  }

  onDeleteClick(deleteSpot: SpotModel): void {
    const index = this.spots.indexOf(deleteSpot);

    this.spotService.deleteById(deleteSpot.id);

    this.spots.splice(index, 1);
  }
}
