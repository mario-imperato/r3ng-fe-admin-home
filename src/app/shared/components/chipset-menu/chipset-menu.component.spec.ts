import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsetMenuComponent } from './chipset-menu.component';

describe('ChipsetMenuComponent', () => {
  let component: ChipsetMenuComponent;
  let fixture: ComponentFixture<ChipsetMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChipsetMenuComponent]
    });
    fixture = TestBed.createComponent(ChipsetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
