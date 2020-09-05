import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerSearchComponent } from './influencer-search.component';

describe('InfluencerSearchComponent', () => {
  let component: InfluencerSearchComponent;
  let fixture: ComponentFixture<InfluencerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
