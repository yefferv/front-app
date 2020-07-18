import { Component, OnInit } from '@angular/core';
// model
import { Customer } from '../../../models/customer.model';
// service
import { CustomerService } from '../../../services/customer.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[];
  selectedCustomer: Customer = new Customer();

  constructor(private _customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._customerService.emitter.subscribe(res => {
      this.getCustomers();
    });

    this.getCustomers();
  }

  getCustomers(): void {
    this._customerService.getCustomers()
    .subscribe( customers => {
      this.customerList = customers;
    });
  }

  onEdit(customer: Customer): void {
    this._customerService.selectedCustomer = Object.assign({}, customer);
    this._customerService.selectedCustomer.$key = customer.identification;
    this._customerService.selected.emit();

    this._customerService.emitter.subscribe(res => {
      this.getCustomers();
    });
  }

  onDelete(identification: string): void {
    if (confirm('Are you sure you want to delete it?')) {
      this._customerService.deleteCustomer(identification)
      .subscribe( customer => customer);
      this.toastr.warning('Deleted Successfully', 'Customer Removed');
      this._customerService.emitter.emit();
      this._customerService.enable.emit();
      this.ngOnInit();
    }
  }
}
