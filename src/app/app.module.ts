import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_ROUTING } from './app.routes';

// services
import { CustomerService } from './services/customer.service';


// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AboutComponent } from './components/about/about.component';
import { SocketComponent } from './components/socket/socket.component';
import { MeasurerComponent } from './components/measurer/measurer.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerSingleComponent } from './components/customer/customer-single/customer-single.component';


// Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerComponent,
    AboutComponent,
    SocketComponent,
    MeasurerComponent,
    HomeComponent,
    CustomerListComponent,
    CustomerSingleComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
