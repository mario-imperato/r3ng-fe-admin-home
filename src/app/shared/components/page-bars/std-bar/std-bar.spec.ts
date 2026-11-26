import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdBar } from './std-bar';

describe('StdBar', () => {
  let component: StdBar;
  let fixture: ComponentFixture<StdBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
