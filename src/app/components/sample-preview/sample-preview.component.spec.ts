import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePreviewComponent } from './sample-preview.component';

describe('SamplePreviewComponent', () => {
  let component: SamplePreviewComponent;
  let fixture: ComponentFixture<SamplePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
