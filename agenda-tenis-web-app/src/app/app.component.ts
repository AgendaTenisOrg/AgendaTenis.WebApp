import { Component, OnInit } from '@angular/core';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'agenda-tenis-web-app';
  isLoggedIn: boolean = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.utilsService.obterToken();
  }
}
