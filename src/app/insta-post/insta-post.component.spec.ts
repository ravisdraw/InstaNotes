import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPostComponent } from './insta-post.component';

describe('InstaPostComponent', () => {
  let component: InstaPostComponent;
  let fixture: ComponentFixture<InstaPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstaPostComponent]
    });
    fixture = TestBed.createComponent(InstaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
