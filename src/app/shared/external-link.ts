import { DOCUMENT, Directive, computed, inject, input } from '@angular/core';

const NOTE_ID = 'new-tab-note';

/**
 * Opens http(s) links in a new tab and describes them to screen readers with a hidden
 * "Opens in a new tab" note, added to the page once. Other links (mailto:, in-app) are left as is.
 */
@Directive({
  selector: 'a[appExternalLink]',
  host: {
    '[attr.href]': 'href()',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': 'external() ? "noopener" : null',
    '[attr.aria-describedby]': `external() ? "${NOTE_ID}" : null`,
  },
})
export class ExternalLink {
  readonly href = input.required<string>();
  protected readonly external = computed(() => /^https?:\/\//.test(this.href()));

  constructor() {
    const doc = inject(DOCUMENT);
    if (!doc.getElementById(NOTE_ID)) {
      const note = doc.createElement('span');
      note.id = NOTE_ID;
      note.hidden = true;
      note.textContent = 'Opens in a new tab';
      doc.body.append(note);
    }
  }
}
