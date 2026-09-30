import { Injectable, signal } from '@angular/core';

/** Open state for the "Get in touch" drawer, shared by the nav and the hero. */
@Injectable({ providedIn: 'root' })
export class Contact {
  readonly open = signal(false);
}
