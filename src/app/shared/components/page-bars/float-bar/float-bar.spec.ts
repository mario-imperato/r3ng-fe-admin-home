import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatBar } from './float-bar';

describe('FloatBar', () => {
  let component: FloatBar;
  let fixture: ComponentFixture<FloatBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
