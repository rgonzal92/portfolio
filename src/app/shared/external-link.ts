import { Directive, computed, input } from '@angular/core';

/**
 * Opens http(s) links in a new tab and describes them to screen readers with the
 * "Opens in a new tab" note in app.html. Other links (mailto:, in-app) are left as is.
 */
@Directive({
  selector: 'a[appExternalLink]',
  host: {
    '[attr.href]': 'href()',
    '[attr.target]': 'external() ? "_blank" : null',
    '[attr.rel]': 'external() ? "noopener" : null',
    '[attr.aria-describedby]': 'external() ? "new-tab-note" : null',
  },
})
export class ExternalLink {
  readonly href = input.required<string>();
  protected readonly external = computed(() => /^https?:\/\//.test(this.href()));
}
