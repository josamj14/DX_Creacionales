import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjectPoolComponent } from "./object-pool/object-pool.component";
import { PrototypeComponent } from "./prototype/prototype.component";
import { AbstractFactoryComponent } from "./abstract-factory/abstract-factory.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ObjectPoolComponent, PrototypeComponent, AbstractFactoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'creacionales'; 

  
}
