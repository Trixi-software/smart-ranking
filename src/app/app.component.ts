import {Component} from '@angular/core';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegistrationModalComponent} from "./components/registration-modal/registration-modal.component";
import {ModalUtils} from "./utils/modal.utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  faLeaf = faLeaf;

  products: string[];

  constructor(private ngbModal: NgbModal) {
    this.products = this.createProducts(21);
  }

  onRegister(): void {
    this.openRegistrationModal();
  }

  openRegistrationModal(): void {
    this.ngbModal.open(RegistrationModalComponent, ModalUtils.createDefaultModalOptions());
  }

  private createProducts(count: number): string[] {
    const products: string[] = [];
    for (let i = 0; i < count; i++) {
      products.push("Produkt " + (i + 1));
    }

    return products;
  }
}
