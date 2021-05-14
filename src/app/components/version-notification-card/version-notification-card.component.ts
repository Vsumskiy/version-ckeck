import { Component, OnInit } from '@angular/core';
import { VersionCheckService } from '@app/services/version-check.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-version-notification-card',
    templateUrl: './version-notification-card.component.html',
    styleUrls: ['./version-notification-card.component.scss']
})
export class VersionNotificationCardComponent implements OnInit {

    public isVersionChanged$: Observable<boolean>;
    public showPopup = true;

    constructor(
        private versionCheckService: VersionCheckService
    ) { }

    ngOnInit(): void {
        this.isVersionChanged$ = this.versionCheckService.currentVersionChanged$;
    }

    public togglePopup(): void {
        this.showPopup = !this.showPopup;
    }

    public reloadApp(): void {
        window.location.reload();
    }
}
