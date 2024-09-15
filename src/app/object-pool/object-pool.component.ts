import { Component } from '@angular/core';

@Component({
  selector: 'app-object-pool',
  standalone: true,
  imports: [],
  templateUrl: './object-pool.component.html',
  styleUrl: './object-pool.component.css'
})
export class ObjectPoolComponent {

}

class OperadoresPool{
  static Pool: OperadoresPool;
  opDisponibles: Operador[];
  opOcupados: Operador[];

  constructor(){
    this.opDisponibles = [];
    this.opOcupados = [];
  }

  inicializarPiscina(){

  }

  asignarOperador(): Operador {
    return new Operador("0", "h");
  }

  liberarOperador(op : Operador) {
  }

}

class Cliente{
  id : string;
  nombre : string;

  constructor(id:string, nombre:string){
    this.id = id;
    this.nombre = nombre;
  }

  enviarMensaje(){

  }

  recibirMensaje(){

  }

  conectar(){
    var michat : Chat;
    michat = new Chat("0", this);
  }

  desconectar(){

  }
}

class Operador{
  id : string;
  nombre : string;

  constructor(id: string, nombre: string){
    this.id = id;
    this.nombre = nombre;
  }

  enviarMensaje(){

  }

  recibirMensaje(){

  }
}

class Chat{
  id : string;
  cliente: Cliente;
  operador?: Operador;
  mensajes: string[];

  constructor(id: string, cliente: Cliente){
    this.id = id;
    this.cliente = cliente;
    this.mensajes = [];
  }

  iniciarChat(){

  }

  terminarChat(){

  }

  agregarMensaje(){

  }
}

