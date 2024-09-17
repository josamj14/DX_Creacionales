import { Component } from '@angular/core';
import { NgClass } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-prototype',
  standalone: true,
  imports: [NgClass,FormsModule],
  templateUrl: './prototype.component.html',
  styleUrl: './prototype.component.css'
})
export class PrototypeComponent {

  selectedDocument: string | null = null;
  department: string = "";
  details: string = "";

  selectDocument(docType: string): void {
    if (this.selectedDocument === docType) {
      this.selectedDocument = null; 
    } else {
      this.selectedDocument = docType; 
    }
    console.log(`Documento seleccionado: ${this.selectedDocument}`);
  }

  cloneDocument(): void {
    if (!this.selectedDocument || !this.department || !this.details) {
      alert("Por favor, selecciona un documento y llena los campos de departamento y detalles.");
      return;
    }

    let documentoBase: Documento;

    switch(this.selectedDocument) {
      case 'Informe':
        documentoBase = new InformeFinanc();
        break;
      case 'Contrato':
        documentoBase = new Contratos();
        break;
      case 'Plan':
        documentoBase = new PlanesEstrat();
        break;
      default:
        return;
    }

    documentoBase.dept = this.department;
    documentoBase.ajuste = this.details;

    console.log(`Documento base creado: ${this.selectedDocument}, Departamento: ${documentoBase.dept}, Detalle: ${documentoBase.ajuste}`);


    const cliente = new Cliente(documentoBase);
    console.log(`Cliente creado para duplicar el documento: ${this.selectedDocument}`);

    const clonedDocument = cliente.duplicarDocumento();
    console.log(`Documento clonado: Departamento: ${(clonedDocument as Documento).dept}, Detalle: ${(clonedDocument as Documento).ajuste}`);

    this.showPopup(clonedDocument as Documento);
  }

  showPopup(clonedDocument: Documento): void {
    alert(`Se creó una copia de ${this.selectedDocument}, se le asignó el departamento "${clonedDocument.dept}" con el detalle "${clonedDocument.ajuste}"`);
  }

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
          console.log('Documento base clonado en constructor.');
      } else {
          this.dept = "";
          this.ajuste = "";
      }
  }

  clone(): Prototype {
    console.log(`Clonando documento...`);
      return new Documento(this);
  }
}

class InformeFinanc extends Documento {
  constructor(prototype?: InformeFinanc) {
      super(prototype);
  }

  override clone(): Prototype {
    console.log('Clonando Informe Financiero...');
      return new InformeFinanc(this);
  }
}


class Contratos extends Documento {
  constructor(prototype?: Contratos) {
      super(prototype);
  }

  override clone(): Prototype {
    console.log('Clonando Contrato...');
      return new Contratos(this);
  }
}

class PlanesEstrat extends Documento {
  constructor(prototype?: PlanesEstrat) {
      super(prototype);
  }

  override clone(): Prototype {
    console.log('Clonando Plan Estratégico...');
      return new PlanesEstrat(this);
  }
}

class Cliente {
  prototype: Prototype;

  constructor(prototype: Prototype) {
      this.prototype = prototype;
  }

  duplicarDocumento(): Prototype {
    console.log('Llamando a método duplicarDocumento() del cliente...');
      return this.prototype.clone();
  }
}