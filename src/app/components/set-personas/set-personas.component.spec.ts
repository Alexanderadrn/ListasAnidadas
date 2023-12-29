import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPersonasComponent } from './set-personas.component';

describe('SetPersonasComponent', () => {
  let component: SetPersonasComponent;
  let fixture: ComponentFixture<SetPersonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPersonasComponent]
    });
    fixture = TestBed.createComponent(SetPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
