import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageLandingTitleComponent } from './home-page-landing-title.component';

describe('HomePageLandingTitleComponent', () => {
  let component: HomePageLandingTitleComponent;
  let fixture: ComponentFixture<HomePageLandingTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomePageLandingTitleComponent]
    });
    fixture = TestBed.createComponent(HomePageLandingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
