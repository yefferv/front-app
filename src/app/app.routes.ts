import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SocketComponent } from './components/socket/socket.component';
import { MeasurerComponent } from './components/measurer/measurer.component';
import { AboutComponent } from './components/about/about.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'socket', component: SocketComponent },
  { path: 'measurer', component: MeasurerComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
