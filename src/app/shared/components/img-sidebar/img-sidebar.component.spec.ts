import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSidebarComponent } from './img-sidebar.component';

describe('ImgSidebarComponent', () => {
  let component: ImgSidebarComponent;
  let fixture: ComponentFixture<ImgSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImgSidebarComponent]
    });
    fixture = TestBed.createComponent(ImgSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
