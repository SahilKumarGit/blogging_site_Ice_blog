import { Injectable, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicsService {

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * here is a servise for changing the nav selector
  */
  private navSelector = new BehaviorSubject<string>("")
  navSelectorStatus = this.navSelector.asObservable();

  navSelectorAction(val: any) {
    this.navSelector.next(val)
  }

  /**
   * here is a servise for changing the nav selector
  */
  private loading = new BehaviorSubject<boolean>(false)
  loadingStatus = this.loading.asObservable();

  loadingAction(val: boolean) {
    this.loading.next(val)
  }


  /**
   * 
  */
  onScreenResize: Observable<Event> = fromEvent(window, 'resize')


  /**
   * alert popup
  */
  alert(val: string, duration: number = 2000) {
    this._snackBar.open(val, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration
    });
  }

}
