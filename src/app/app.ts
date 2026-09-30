import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ContactDrawer } from './core/layout/contact-drawer';
import { Footer } from './core/layout/footer';
import { Nav } from './core/layout/nav';

@Component({
  imports: [ContactDrawer, Footer, Nav, RouterOutlet, ScrollTopModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  // A plain "#main" link would resolve against <base href> and navigate away from /resume.
  protected skipToContent(event: Event, main: HTMLElement): void {
    event.preventDefault();
    main.focus();
  }
}
