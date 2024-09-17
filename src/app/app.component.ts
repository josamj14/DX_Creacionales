import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObjectPoolComponent } from "./object-pool/object-pool.component";
import { PrototypeComponent } from "./prototype/prototype.component";
import { AbstractFactoryComponent } from "./abstract-factory/abstract-factory.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent,ObjectPoolComponent, PrototypeComponent, AbstractFactoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'


})

export class AppComponent {
  title = 'creacionales';

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
