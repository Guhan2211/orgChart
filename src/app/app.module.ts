import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialThemesModule } from './material-themes.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpCardComponent } from './components/emp-card/emp-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    SidebarComponent,
    EmpCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialThemesModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
