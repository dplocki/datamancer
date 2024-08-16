import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTreeComponent } from './tables-tree.component';

describe('TablesTreeComponent', () => {
  let component: TablesTreeComponent;
  let fixture: ComponentFixture<TablesTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
