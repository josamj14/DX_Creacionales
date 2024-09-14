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

class Cliente{
  id : string;
  nombre : string;

  constructor(id:string, nombre:string){
    this.id = id;
    this.nombre = nombre;
  }
}

