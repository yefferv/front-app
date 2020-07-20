import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// model
import { Customer } from '../../../models/customer.model';
// service
import { CustomerService } from '../../../services/customer.service';


// toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-customer-single',
  templateUrl: './customer-single.component.html',
  styleUrls: ['./customer-single.component.css']
})
export class CustomerSingleComponent implements OnInit {

  public form: FormGroup;

  constructor(public customerService: CustomerService, private toastr: ToastrService, private fb: FormBuilder ) {
     this.form = fb.group({
      identification: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]});
  }

  ngOnInit(): void {
    this.customerService.getCustomers()
    .subscribe( customers =>  customers);

    this.customerService.selected.subscribe(res => {
      console.log('subscribe ingreso');
      console.log(this.customerService.selectedCustomer.$key);

      this.changeSelectedCustomer();
    });

    this.customerService.enable.subscribe(res => {
      this.stateControls('identification', 'enable');
      this.resetForm();
    });

    this.resetForm();
  }

  changeSelectedCustomer(): void{
    this.form.controls['identification'].setValue(this.customerService.selectedCustomer.identification);
    this.form.controls['name'].setValue(this.customerService.selectedCustomer.name);
    this.form.controls['address'].setValue(this.customerService.selectedCustomer.address);
    this.form.controls['phone'].setValue(this.customerService.selectedCustomer.phone);
    this.form.controls['mail'].setValue(this.customerService.selectedCustomer.mail);

    this.stateControls('identification', 'disable');

  }

  onSubmit(): void
  {
    if (this.customerService.selectedCustomer.$key == null)
    {
      this.customerService.createCustomer(this.form.value)
      .subscribe( customer => customer);
      this.toastr.success('Sucessful Operation', 'Customer created');
    } else {
      this.customerService.updateCustomer(this.customerService.selectedCustomer.identification, this.form.value)
      .subscribe( customer => customer);
      this.toastr.success('Sucessful Operation', 'Update customer');
    }
    this.customerService.emitter.emit();
    this.resetForm();
  }

  resetForm(): void
  {
    this.form.reset();
    this.customerService.selectedCustomer = new Customer();
    this.customerService.emitter.emit();
    this.stateControls('identification', 'enable');
  }

  stateControls(controlName: string, state: string): void{
    this.form.controls[controlName][state]();
  }

}
