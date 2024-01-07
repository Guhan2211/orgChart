import { Component, OnInit} from '@angular/core';
import runMock from './mockApi';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent implements OnInit{
  title = 'orgChart';

  ngOnInit(){
    runMock();
}

}
