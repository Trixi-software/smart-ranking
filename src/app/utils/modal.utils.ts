import {NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

export class ModalUtils {
  static createDefaultModalOptions(): NgbModalOptions {
    return {
      keyboard: false,
      backdrop: "static",
      centered: true
    } as NgbModalOptions;
  }
}
