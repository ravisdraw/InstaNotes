import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDataPageComponent } from './new-data-page.component';

describe('NewDataPageComponent', () => {
  let component: NewDataPageComponent;
  let fixture: ComponentFixture<NewDataPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDataPageComponent]
    });
    fixture = TestBed.createComponent(NewDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
