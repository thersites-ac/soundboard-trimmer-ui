import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimmerComponent } from './trimmer.component';

describe('TrimmerComponent', () => {
  let component: TrimmerComponent;
  let fixture: ComponentFixture<TrimmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
