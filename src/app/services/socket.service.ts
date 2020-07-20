import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from '../models/socket.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  emitter = new EventEmitter();
  constructor(private http: HttpClient) { }

  getSockets(): Observable<any>{
    return this.http.get(base_url + '/sockets');
  }

  createSocket(socket: Socket): Observable<any>{
    return this.http.post(base_url + '/sockets', socket);
  }

  editSocket(id: string, socket: Socket): Observable<any>{
    return this.http.put(base_url + '/sockets/' + id, socket);
  }

  deleteSocket(id: string): Observable<any>{
    return this.http.delete(base_url + '/sockets/' + id);
  }
}
