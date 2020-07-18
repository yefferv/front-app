import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';


import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  selectedCustomer: Customer = new Customer();
  emitter = new EventEmitter();
  selected = new EventEmitter();
  enable = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getCustomers() {
    const url = `${ base_url }/customers`;
    return this.http.get(url)
              .pipe(
                map( (resp: Customer[])  => resp )
              );
  }

  createCustomer( customer: Customer ) {

    const url = `${ base_url }/customers`;
    return this.http.post( url, customer);
  }

  updateCustomer( id: string, customer: Customer  ) {

    const url = `${ base_url }/customers/${ id }`;
    return this.http.put( url, customer);
  }

  deleteCustomer( id: string ) {
    const url = `${ base_url }/customers/${ id }`;
    return this.http.delete(url);
  }

  changeSelectedCustomer(){
    return this.selectedCustomer;
  }
}
