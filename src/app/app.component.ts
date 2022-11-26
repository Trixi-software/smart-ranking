import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RegistrationModalComponent} from "./components/registration-modal/registration-modal.component";
import {ModalUtils} from "./utils/modal.utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private ngbModal: NgbModal) {
  }

  onRegister(): void {
    this.openRegistrationModal();
  }

  openRegistrationModal(): void {
    const registrationModal = this.ngbModal.open(RegistrationModalComponent, ModalUtils.createDefaultModalOptions());
    // registrationModal.result.then(
    //
    // );
  }
}
