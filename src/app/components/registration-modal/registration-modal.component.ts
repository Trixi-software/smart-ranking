import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RankRequest} from "../../api/types/rank-request";
import {Address} from "../../api/types/address";
import {finalize} from "rxjs";
import {RankResponse} from "../../api/types/rank-response";
import {RankApiService} from "../../api/services/rank-api.service";
import {RegistrationFlow} from "../../types/registration-flow.enum";
import {faCalendar, faCoffee} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss']
})
export class RegistrationModalComponent implements OnInit {

  faCalendar = faCalendar;
  registrationFlowEnum = RegistrationFlow;

  rankInProgress: boolean;
  finalRank: RankResponse | undefined;
  registrationFlow: RegistrationFlow;

  // @ts-ignore
  form: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private rankApiService: RankApiService) {
    this.rankInProgress = false;
    this.finalRank = undefined;
    this.registrationFlow = RegistrationFlow.REGISTRATION;
    this.createForm();
  }

  ngOnInit(): void {
  }

  get personalGroup(): FormGroup {
    return this.form.get('personal') as FormGroup;
  }

  get businessGroup(): FormGroup {
    return this.form.get('business') as FormGroup;
  }

  get firstNameControl(): FormControl {
    return this.personalGroup.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.personalGroup.get('lastName') as FormControl;
  }

  get dateOfBirthControl(): FormControl {
    return this.personalGroup.get('dateOfBirth') as FormControl;
  }

  get personalAddressGroup(): FormGroup {
    return this.personalGroup.get('address') as FormGroup;
  }

  get personalAddressStreetControl(): FormControl {
    return this.personalAddressGroup.get('street') as FormControl;
  }

  get personalAddressCityControl(): FormControl {
    return this.personalAddressGroup.get('city') as FormControl;
  }

  get personalAddressZipControl(): FormControl {
    return this.personalAddressGroup.get('zip') as FormControl;
  }

  get taxNumberControl(): FormControl {
    return this.businessGroup.get('taxNumber') as FormControl;
  }

  close(): void {
    this.activeModal.close();
  }

  register(): void {
    if (this.form.valid) {
      this.rankRegistration();
    } else {
      console.log('Form is not valid.', this.form);
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      personal: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          zip: ['', Validators.required]
        })
      }),
      business: this.fb.group({
        taxNumber: ['']
      })
    });
  }

  private rankRegistration(): void {
    const request: RankRequest = this.prepareRankRequest();
    this.sendRank(request);
  }

  private prepareRankRequest(): RankRequest {
    return {
      firstName: this.firstNameControl.value,
      sureName: this.lastNameControl.value,
      birthDate: this.dateOfBirthControl.value,
      address: {
        street: this.personalAddressStreetControl.value,
        city: this.personalAddressCityControl.value,
        zip: this.personalAddressZipControl.value
      } as Address,
      taxNumber: !!this.taxNumberControl.value ? this.taxNumberControl.value : undefined
    } as RankRequest;
  }

  private sendRank(request: RankRequest): void {
    this.rankInProgress = true;
    this.finalRank = undefined;
    this.rankApiService.sendRank(request)
      .pipe(
        finalize(() => this.rankInProgress = false)
      ).subscribe((response: RankResponse) => {
      this.finalRank = response;
      this.registrationFlow = RegistrationFlow.RANK_RESULT;
    });
  }

}
