import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPanelComponent } from './query-panel.component';

describe('PanelComponent', () => {
  let component: QueryPanelComponent;
  let fixture: ComponentFixture<QueryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QueryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
