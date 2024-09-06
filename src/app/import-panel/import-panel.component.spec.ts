import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPanelComponent } from './import-panel.component';

describe('ImportPanelComponent', () => {
  let component: ImportPanelComponent;
  let fixture: ComponentFixture<ImportPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
