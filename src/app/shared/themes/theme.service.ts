import { computed, effect, Injectable, signal } from '@angular/core';

const THEME_COLOR = 'theme-color';
const THEME_MODE = 'theme-mode';
const THEME_DEFAULT = 'pi'

const supportedThemes: Map<string, string> = new Map([
    ['pi', 'pi'],
    ['edenred', 'edenred'],
    ['greeneish', 'greeneish']
])

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public mode = signal<'light' | 'dark'>('light');
  public color = signal<string>("");

  public currentTheme = computed(() => `${this.color()}`) // dark-green
  //public currentTheme = computed(() => this.color());

 constructor() {

    const mode = localStorage.getItem(THEME_MODE) as 'light' | 'dark'

    if (mode) {
      this.mode.set(mode);
    }

    const color = localStorage.getItem(THEME_COLOR) as string
    if (color) {
      this.color.set(color);
    }

    effect(() => {
      const className = this.currentTheme()
      if (className) {
          document.documentElement.className = this.currentTheme();
          localStorage.setItem(THEME_COLOR, this.color());
          localStorage.setItem(THEME_MODE, this.mode());
      } else {
          document.documentElement.className = "";
      }
    });

  }

  setMode(value: 'light' | 'dark') {
    this.mode.set(value);
  }

  setColor(value: string) {
    if (!supportedThemes.get(value)) {
         value = THEME_DEFAULT
    }
    this.color.set(value);
  }

}
