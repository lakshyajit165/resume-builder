import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private _router: Router) {}

  goToRoute(path: string): void {
    this._router.navigate([path]);
  }

  getPrimaryColor(): string {
    // Logic to retrieve the primary color from your theme
    return 'primary'; // Replace with actual color value
  }
}
