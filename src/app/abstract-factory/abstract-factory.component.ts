import { Component } from '@angular/core';

@Component({
  selector: 'app-abstract-factory',
  standalone: true,
  imports: [],
  templateUrl: './abstract-factory.component.html',
  styleUrl: './abstract-factory.component.css'
})
export class AbstractFactoryComponent {



}

//Clases generales
class Usuario {
  id : string;
  nombre : string;

  constructor(id:string, nombre:string){
    this.id = id;
    this.nombre = nombre;
  }

  //public agregarCamara():

}

class VideoConferencia{
  id : string;
  ilimitado : boolean;
  duracionMin : number;
  link : string;
  invitados : Usuario[]; 
  //activa : boolean

  constructor(id: string, ilimitado : boolean, duracionMin : number, link : string){
    this.id = id;
    this.ilimitado = ilimitado;
    this.duracionMin = duracionMin;
    this.link = link;
    this.invitados = [];
  }
}

//Fabrica abstracta
interface AbstractFactory {
  conectarCamaraReunion(id : string, resolucion : number): CamaraWeb; 
  conectarMicrofonoReunion(id : string, calidadDeAudio : number): Microfono;
}

class FabricaDell implements AbstractFactory {
  public conectarCamaraReunion(id : string, resolucion : number):   {
    return new CamaraDell(id, resolucion);
  }

  public conectarMicrofonoReunion(id : string, calidadDeAudio : number): Microfono{
      return new MicrofonoDell(id, calidadDeAudio);
  }
}

class FabricaHP implements AbstractFactory {
  public conectarCamaraReunion(id : string, resolucion : number): CamaraWeb{
    return new CamaraHP(id, resolucion);
  }

  public conectarMicrofonoReunion(id : string, calidadDeAudio : number): Microfono{
      return new MicrofonoHP(id, calidadDeAudio);
  }
} 

//Implementacion de interfaz para camara web.
interface CamaraWeb {
  conectarCamara(): string;
}

class CamaraDell implements CamaraWeb {
  id : string;
  resolucion : number;

  constructor(id : string, resolucion : number){
    this.id = id;
    this.resolucion = resolucion;
  }

  public conectarCamara(): string {
      return 'Se ha conectado la cámara Dell';
  }
}

class CamaraHP implements CamaraWeb {
  id : string;
  resolucion : number;

  constructor(id : string, resolucion : number){
    this.id = id;
    this.resolucion = resolucion;
  }

  public conectarCamara(): string {
      return 'Se ha conectado la cámara HP';
  }
} 

//Implementacion de interfaz para microfono.
interface Microfono {
  conectarMicrofono(): string;
}

class MicrofonoDell implements Microfono {
  id : string;
  calidadDeAudio : number;

  constructor(id : string, calidadDeAudio : number){
    this.id = id;
    this.calidadDeAudio = calidadDeAudio;
  }

  public conectarMicrofono(): string {
      return 'Se ha conectado el micrófono Dell';
  }
}

class MicrofonoHP implements Microfono {
  id : string;
  calidadDeAudio : number;

  constructor(id : string, calidadDeAudio : number){
    this.id = id;
    this.calidadDeAudio = calidadDeAudio;
  }

  public conectarMicrofono(): string {
      return 'Se ha conectado el micrófono HP';
  }
} 


