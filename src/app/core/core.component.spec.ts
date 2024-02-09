import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreComponent } from './core.component';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService } from './services';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [CoreComponent],
      providers: [ElectronService],
      imports: [RouterTestingModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(CoreComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
