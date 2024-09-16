import { Component } from '@angular/core';

@Component({
  selector: 'app-prototype',
  standalone: true,
  imports: [],
  templateUrl: './prototype.component.html',
  styleUrl: './prototype.component.css'
})
export class PrototypeComponent {

}


interface Prototype {

  clone(): Prototype;
}

class Documento implements Prototype {
  dept: string;
  ajuste: string;

  constructor(prototype?: Documento) {
      if (prototype) {
          this.dept = prototype.dept;
          this.ajuste = prototype.ajuste;
      } else {
          this.dept = "";
          this.ajuste = "";
      }
  }

  clone(): Prototype {
      return new Documento(this);
  }
}

class InformeFinanc extends Documento {
  constructor(prototype?: InformeFinanc) {
      super(prototype);
  }

  override clone(): Prototype {
      return new InformeFinanc(this);
  }
}


class Contratos extends Documento {
  constructor(prototype?: Contratos) {
      super(prototype);
  }

  override clone(): Prototype {
      return new Contratos(this);
  }
}

class PlanesEstrat extends Documento {
  constructor(prototype?: PlanesEstrat) {
      super(prototype);
  }

  override clone(): Prototype {
      return new PlanesEstrat(this);
  }
}

class Cliente {
  prototype: Prototype;

  constructor(prototype: Prototype) {
      this.prototype = prototype;
  }

  duplicarDocumento(): Prototype {
      return this.prototype.clone();
  }
}