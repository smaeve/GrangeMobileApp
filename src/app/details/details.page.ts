import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  modules2: any;

  constructor(private route: ActivatedRoute, private router: Router){
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.modules2 = this.router.getCurrentNavigation().extras.state.modules2;
        console.log(this.modules2);
      }
    });
  }  

  ngOnInit() {
  }

}