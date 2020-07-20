import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//models
import { Socket } from '../../models/socket.model';
import { Customer } from '../../models/customer.model';

//services
import { SocketService } from '../../services/socket.service';
import { CustomerService } from '../../services/customer.service';


// toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  sockets: Socket[];
  selectedSocket: Socket;
  editar = false;
  customerList: Customer[];
  socket: Socket = {
    code: null,
    city: null,
    address: null,
    coordinateX: null,
    coordinateY: null,
    customer_identification: null
  };

  public form: FormGroup;

  constructor(private socketService: SocketService, private toastr: ToastrService, private fb: FormBuilder, private customerService: CustomerService ) {
    this.form = fb.group({
      code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      coordinateX: ['', [Validators.required]],
      coordinateY: ['', [Validators.required]],
      customer_identification: ['', [Validators.required]]});
  }

  ngOnInit(): void {

    this.socketService.emitter.subscribe(res => {
      this.getSockets();
    });

    this.getCustomers();
    this.getSockets();
  }

  getSockets(): void {
    this.socketService.getSockets().subscribe(
      sockets => {
        this.sockets = sockets;
      });
  }


  getCustomers(): void {
    this.customerService.getCustomers()
    .subscribe( customers => {
      this.customerList = customers;
    });
  }

  onSubmit(): void
  {
    console.log('obj enviado', this.form.value);
    console.log('propiedad obj', this.selectedSocket);
    console.log('propiedad de edicion', this.editar);

    if (!this.editar)
    {
      this.socketService.createSocket(this.form.value).subscribe(
        socket => {
          this.selectedSocket = socket;
        });
      this.toastr.success('Sucessful Operation', 'Socket created');
    } else {
      this.socketService.editSocket(this.selectedSocket.code, this.form.value).subscribe(
        socket => {
          this.selectedSocket = socket;
        });
      this.toastr.success('Sucessful Operation', 'Update socket');
    }
    this.socketService.emitter.emit();
    this.closeModal.nativeElement.click();
    this.ngOnInit();
  }

  showSaveDialog(editar: boolean, socket: Socket): void
  {
    this.editar = editar;
    console.log(this.editar);
    if (editar) {
        this.socket   = this.selectedSocket;
        this.selectedSocket = Object.assign({}, socket);
        this.changeSelectedSocket();
    } else {
      this.stateControls('code', 'enable');
      this.socket = new Socket();
      this.selectedSocket = this.socket;
      this.form.reset();
    }
  }

  delete(socket: Socket): void{
    if (confirm('Are you sure you want to delete it?')) {
      this.socket   = this.selectedSocket;
      this.selectedSocket = Object.assign({}, socket);

      this.socketService.deleteSocket(this.selectedSocket.code)
      .subscribe(resp => {
          this.selectedSocket = resp;
        });
      this.toastr.warning('Deleted Successfully', 'Socket Removed');
      this.socketService.emitter.emit();
      this.ngOnInit();
    }
  }


  changeSelectedSocket(): void{

    this.form.controls['code'].setValue(this.selectedSocket.code);
    this.form.controls['city'].setValue(this.selectedSocket.city);
    this.form.controls['address'].setValue(this.selectedSocket.address);
    this.form.controls['coordinateX'].setValue(this.selectedSocket.coordinateX);
    this.form.controls['coordinateY'].setValue(this.selectedSocket.coordinateY);
    this.form.controls['customer_identification'].setValue(this.selectedSocket.customer_identification);

    this.stateControls('code', 'disable');

  }

  stateControls(controlName: string, state: string): void{
    this.form.controls[controlName][state]();
  }

}
