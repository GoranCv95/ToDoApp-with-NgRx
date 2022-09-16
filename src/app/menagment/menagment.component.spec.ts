import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagmentComponent } from './menagment.component';

describe('MenagmentComponent', () => {
  let component: MenagmentComponent;
  let fixture: ComponentFixture<MenagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
