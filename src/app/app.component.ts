import {Component, OnInit} from '@angular/core';
import {VersionCheckService} from '@app/services/version-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
      private versionCheckService: VersionCheckService
  ) {}

  ngOnInit(): void {
    this.versionCheckService.initVersionCheck();
  }
}
