import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-object-pool',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-pool.component.html',
  styleUrl: './object-pool.component.css'
})

export class ObjectPoolComponent {
  //Esta clase es el main que tiene que controla la interfaz gráfica y llamadas a métodos de los objetos
  countClientes = 1;
  chatList : Chat[] = [];
  piscina : boolean = false;
  operadoresOcupados : Operador [] = OperadoresPool.opOcupados;
  operadoresDescupados : Operador [] = OperadoresPool.opDisponibles;

  inicializarPiscina(){
    OperadoresPool.inicializarPiscina();
    this.piscina = true;
    this.operadoresOcupados = OperadoresPool.opOcupados;
    this.operadoresDescupados = OperadoresPool.opDisponibles;
  }

  crearChat(){
    var id : number = this.countClientes++;;
    var chatCreado : Chat = new Chat (`${id}`, new Cliente(`${id}`, "Cliente "+ id));
    chatCreado.iniciarChat();
    this.chatList.push(chatCreado);
  }

  getMessage(chat : Chat):string{
    
    if (typeof chat.operador === 'undefined') {
      return "El chat del " + chat.cliente.nombre + " no pudo ser creado por falta de operadores.";
    }
    return "El chat " + chat.id + " tiene al " + chat.cliente.nombre + " y se le asigno al " + chat.operador?.nombre;
    
  }

  eliminarChat(chat : Chat){
    chat.terminarChat();
    this.chatList.filter(c => c !== chat);
  }  

  exists(chat: Chat) : boolean {
    return chat.exist;
  }

  operadorExists(chat: Chat) : boolean {
    return (typeof chat.operador !== 'undefined')
  }
}

class OperadoresPool{
  static opDisponibles: Operador[]  = [];
  static opOcupados: Operador[]  = [];

  constructor(){
  }

  static inicializarPiscina() {
    for (let index = 0; index < 15; index++) {
      var opCreado : Operador =new Operador(`${index+1}`,"Operador " + (index+1));
      this.opDisponibles.push(opCreado);
    }
    console.log("Piscina inicializada!");
  }

  static asignarOperador(): Operador | undefined {
    var opAsignar = this.opDisponibles.pop();
    if (opAsignar!== undefined) {
      this.opOcupados.push(opAsignar);
    }
    console.log("Se asignará al "+ opAsignar?.nombre);
    return opAsignar;
  }

  static liberarOperador(op : Operador) {
    this.opDisponibles.push(op);
    this.opOcupados = this.opOcupados.filter(ope => ope.id !== op.id); 
    console.log("Se liberó al " + op.nombre);
  }
}

class Cliente{
  id : string;
  nombre : string;

  constructor(id:string, nombre:string){
    this.id = id;
    this.nombre = nombre;
  }

  enviarMensaje(mensaje : string, chat: Chat){
    chat.agregarMensaje(mensaje);
  }

}

class Operador{
  id : string;
  nombre : string;

  constructor(id: string, nombre: string){
    this.id = id;
    this.nombre = nombre;
  }

  enviarMensaje(mensaje : string, chat:Chat){
    chat.agregarMensaje(mensaje);
  }

}

class Chat{
  id : string;
  cliente: Cliente;
  operador?: Operador;
  mensajes: string[];
  exist: boolean = true;

  constructor(id: string, cliente: Cliente){
    this.id = id;
    this.cliente = cliente;
    this.mensajes = [];
    console.log("Chat was created with " + cliente.nombre);
  }

  iniciarChat(){
    var op : Operador | undefined = OperadoresPool.asignarOperador();
    if (typeof op === 'undefined') {
      console.log("Chat could not be created");
    }
    this.operador = op;
  }

  terminarChat(){
    if (typeof this.operador !== 'undefined') {
      OperadoresPool.liberarOperador(this.operador);
    }
    this.exist = false;
  }

  agregarMensaje(mensaje:string){
    this.mensajes.push(mensaje)
  }

}

