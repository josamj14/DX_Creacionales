import { Component, OnInit, NgModule } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abstract-factory',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './abstract-factory.component.html',
  styleUrl: './abstract-factory.component.css',
})
export class AbstractFactoryComponent {
  clienteId: string = '';
  clienteNombre: string = '';
  cliente: Usuario | null = null;
  llamada: VideoConferencia | null = null;
  constructor(private router: Router) {}
  irMenu(ruta: string) {
    this.router.navigate([ruta]);
  }

  llamadaExiste(): boolean {
    return this.llamada != null;
  }

  clienteExiste(): boolean {
    return this.cliente != null;
  }

  fabricaExiste(): boolean {
    return this.cliente?.getFabrica() != null;
  }

  getClienteId() {
    return this.clienteId;
  }

  getClienteName() {
    return this.clienteNombre;
  }

  showPopup(mensaje: string | undefined): void {
    if (mensaje != undefined) {
      alert(mensaje);
    }
  }

  public iniciarFabricaDell() {
    if (!this.cliente || this.cliente.getFabrica() != null) {
      console.error('Cliente no está definido o fabrica ya inicializada');
      return;
    }
    this.cliente.setFabrica(new FabricaDell());
    console.log('Cliente:', this.cliente);
  }
  public iniciarFabricaHP() {
    if (!this.cliente || this.cliente.getFabrica() != null) {
      console.error('Cliente no está definido o fabrica ya inicializada');
      return;
    }
    this.cliente.setFabrica(new FabricaHP());
    console.log('Cliente:', this.cliente);
  }

  public conectarCamara() {
    if (!this.cliente || this.cliente.getFabrica() == null) {
      console.error('Cliente no está definido o fabrica ya inicializada');
      return;
    }
    console.log(
      this.cliente
        .getFabrica()
        ?.conectarCamaraReunion('asd', 123)
        .conectarCamara()
    );
    this.showPopup(
      this.cliente
        .getFabrica()
        ?.conectarCamaraReunion('asd', 123)
        .conectarCamara()
    );
  }
  public conectarMicrofono() {
    if (!this.cliente || this.cliente.getFabrica() == null) {
      console.error('Cliente no está definido o fabrica ya inicializada');
      return;
    }
    console.log(
      this.cliente
        .getFabrica()
        ?.conectarMicrofonoReunion('asd', 123)
        .conectarMicrofono()
    );
    this.showPopup(
      this.cliente
        .getFabrica()
        ?.conectarMicrofonoReunion('asd', 123)
        .conectarMicrofono()  
    );
  }

  ngOnInit(): void {
    console.log('Componente abstract-factory iniciado');
  }

  public inicializarCliente(): void {
    if (!this.clienteId || !this.clienteNombre) {
      console.error('Debe ingresar un ID y un nombre para el cliente.');
      return;
    }

    // Inicializar el cliente con los valores de los inputs
    this.cliente = new Usuario(this.clienteId, this.clienteNombre);
    console.log('Cliente inicializado:', this.cliente);

    this.llamada?.anadirInvitado(this.cliente);
  }

  public inicializarLlamada(): void {
    if (this.llamada != null) {
      console.error('La llamada ya esta inicializada');
      return;
    }

    // Inicializar el cliente con los valores de los inputs
    this.llamada = new VideoConferencia();
    console.log('Llamada inicializada', this.llamada);
  }
}

//Clases generales
class Usuario {
  id: string;
  nombre: string;
  fabrica?: AbstractFactory;

  constructor(id: string, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

  public setFabrica(fabrica: AbstractFactory): void {
    this.fabrica = fabrica;
    console.log('Fábrica asignada al cliente:', this.fabrica);
  }
  public getFabrica() {
    return this.fabrica;
  }
}

class VideoConferencia {
  id: string;
  ilimitado: boolean;
  duracionMin: number;
  link: string;
  invitados: Usuario[];
  //activa : boolean

  constructor() {
    this.id = '14en5ea2e';
    this.ilimitado = false;
    this.duracionMin = 30;
    this.link = 'video147aw74s8r6a5we7#2asf5';
    this.invitados = [];
  }

  public anadirInvitado(invi: Usuario) {
    this.invitados.push(invi);
    console.log('Usuario añadido a la conferencia:', invi);
  }
}

//Fabrica abstracta
interface AbstractFactory {
  conectarCamaraReunion(id: string, resolucion: number): CamaraWeb;
  conectarMicrofonoReunion(id: string, calidadDeAudio: number): Microfono;
}

class FabricaDell implements AbstractFactory {
  public conectarCamaraReunion(id: string, resolucion: number): CamaraWeb {
    return new CamaraDell(id, resolucion);
  }

  public conectarMicrofonoReunion(
    id: string,
    calidadDeAudio: number
  ): Microfono {
    return new MicrofonoDell(id, calidadDeAudio);
  }

  constructor() {}
}

class FabricaHP implements AbstractFactory {
  public conectarCamaraReunion(id: string, resolucion: number): CamaraWeb {
    return new CamaraHP(id, resolucion);
  }

  public conectarMicrofonoReunion(
    id: string,
    calidadDeAudio: number
  ): Microfono {
    return new MicrofonoHP(id, calidadDeAudio);
  }

  constructor() {}
}

//Implementacion de interfaz para camara web.
interface CamaraWeb {
  conectarCamara(): string;
}

class CamaraDell implements CamaraWeb {
  id: string;
  resolucion: number;

  constructor(id: string, resolucion: number) {
    this.id = id;
    this.resolucion = resolucion;
  }

  public conectarCamara(): string {
    return 'Se ha conectado la cámara Dell';
  }
}

class CamaraHP implements CamaraWeb {
  id: string;
  resolucion: number;

  constructor(id: string, resolucion: number) {
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
  id: string;
  calidadDeAudio: number;

  constructor(id: string, calidadDeAudio: number) {
    this.id = id;
    this.calidadDeAudio = calidadDeAudio;
  }

  public conectarMicrofono(): string {
    return 'Se ha conectado el micrófono Dell';
  }
}

class MicrofonoHP implements Microfono {
  id: string;
  calidadDeAudio: number;

  constructor(id: string, calidadDeAudio: number) {
    this.id = id;
    this.calidadDeAudio = calidadDeAudio;
  }

  public conectarMicrofono(): string {
    return 'Se ha conectado el micrófono HP';
  }
}
