import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmpCardComponent } from './components/emp-card/emp-card.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { TreeComponent } from './components/tree/tree.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,FormsModule ],
      providers:[EmployeeService],
      declarations: [
        EmpCardComponent,
        AppComponent,
        SidebarComponent,
        TreeComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

    it('should have input Component', () => {
    let fixture = TestBed.createComponent(SidebarComponent);

    const app = fixture.debugElement.nativeElement;

    //console.log(app);
    const inputElem = app.querySelector("input");
    //console.log(inputElem);
    //const app = fixture.componentInstance;
    expect(inputElem).toBeTruthy();
  });

  it('should have Dropdown Component', () => {
    let fixture = TestBed.createComponent(SidebarComponent);

    const app = fixture.debugElement.nativeElement;

    //console.log(app);
    const dropElem = app.querySelector("#dd");
    //console.log(inputElem);
    //const app = fixture.componentInstance;
    expect(dropElem).toBeTruthy();
  });


});
