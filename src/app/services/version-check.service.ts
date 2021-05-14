import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '@environment';
import { BehaviorSubject } from 'rxjs';

interface AppVersionInterface {
  version: string;
  hash: string;
}

const initialHash = '{{POST_BUILD_ENTERS_HASH_HERE}}'

@Injectable({providedIn: 'root'})
export class VersionCheckService {

  private versionUrl = environment.versionUrl;
  private frequency = 1000 * 60 * 30;

  private isVersionChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  readonly currentVersionChanged$ = this.isVersionChanged$.asObservable();


  // this will be replaced by actual hash post-build.js
  private currentHash = initialHash;

  constructor(
      private http: HttpClient
  ) {}

  /**
   * Checks in every set frequency the version of frontend application
   */
  public initVersionCheck(): void {
    setInterval(() => this.checkVersion(), this.frequency);
    this.checkVersion();
  }

  /**
   * Will do the call and check if the hash has changed or not
   */
  private checkVersion(): void {
    // timestamp these requests to invalidate caches
    this.http.get<AppVersionInterface>(this.versionUrl + '?t=' + new Date().getTime())
        .subscribe(
            (response) => {
              if (this.hasHashChanged(this.currentHash, response.hash)) {
                this.isVersionChanged$.next(true);
              }
              // store the new hash so we wouldn't trigger versionChange again
              this.currentHash = response.hash;
            },
            (err) => {
              console.error(err, 'Could not get version');
            },
        );
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   */
  private hasHashChanged(currentHash, newHash): boolean {
    if (!currentHash || currentHash === initialHash) {
      return false;
    }
    return currentHash !== newHash;
  }
}
