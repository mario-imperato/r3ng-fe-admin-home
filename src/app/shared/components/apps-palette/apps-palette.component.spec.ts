import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPaletteComponent } from './apps-palette.component';

describe('AppsPaletteComponent', () => {
  let component: AppsPaletteComponent;
  let fixture: ComponentFixture<AppsPaletteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppsPaletteComponent]
    });
    fixture = TestBed.createComponent(AppsPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
