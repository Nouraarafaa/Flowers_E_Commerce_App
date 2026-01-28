import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationMyAppService {
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly translateService = inject(TranslateService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.translateService.setDefaultLang('en');

      const savedLang = localStorage.getItem('lang') as 'en' | 'ar' | null;

      if (savedLang) {
        this.translateService.use(savedLang);
      }

      this.updateDirection(savedLang ?? 'en');
    }
  }

  setLanguage(lang: 'en' | 'ar'): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }

    this.translateService.use(lang);
    this.updateDirection(lang);
  }

  private updateDirection(lang: 'en' | 'ar'): void {
    this.renderer.setAttribute(
      document.documentElement,
      'dir',
      lang === 'ar' ? 'rtl' : 'ltr'
    );
    this.renderer.setAttribute(document.documentElement, 'lang', lang);
  }

}
