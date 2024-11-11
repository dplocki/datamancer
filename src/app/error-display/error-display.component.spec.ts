import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDisplayComponent } from './error-display.component';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErrorDisplayComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display message when message input is undefined', () => {
    component.message = undefined;
    fixture.detectChanges();

    const preElement = fixture.nativeElement.querySelector('pre');
    expect(preElement).toBeNull();
  });

  it('should not display message when message input is null', () => {
    component.message = null;
    fixture.detectChanges();

    const preElement = fixture.nativeElement.querySelector('pre');
    expect(preElement).toBeNull();
  });

  it('should display message when message input is provided', () => {
    const testMessage = 'Test error message';
    component.message = testMessage;
    fixture.detectChanges();

    const preElement = fixture.nativeElement.querySelector('pre');
    expect(preElement).toBeTruthy();
    expect(preElement.textContent).toContain(testMessage);
  });
});