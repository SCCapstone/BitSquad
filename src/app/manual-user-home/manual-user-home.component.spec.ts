import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualUserHomeComponent } from './manual-user-home.component';

describe('ManualUserHomeComponent', () => {
  let component: ManualUserHomeComponent;
  let fixture: ComponentFixture<ManualUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualUserHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
