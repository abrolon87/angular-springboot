import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { OrderFormService } from 'src/app/services/order-form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private orderFormService: OrderFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CustomValidators.notOnlyWhitespace,
        ]),
        country: new FormControl('', [Validators.required]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CustomValidators.notOnlyWhitespace,
        ]),
        country: new FormControl('', [Validators.required]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expMonth: [''],
        expYear: [''],
      }),
    });

    // populate credit card exp date info
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);
    this.orderFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.orderFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    // populate countries

    this.orderFormService.getCountries().subscribe((data) => {
      console.log(JSON.stringify(data));
      this.countries = data;
    });
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;

    if (isChecked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
      // bug fix for states not appearing
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      // bug fix for states
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();

    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.orderFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Credit card months ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    console.log(
      `${formGroupName} countryCode: ${countryCode} countryName: ${countryName}`
    );
    this.orderFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      // select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  onSubmit() {
    console.log('Order submitted!');

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')?.value.firstName);
    console.log(this.checkoutFormGroup.get('customer')?.value.lastName);
    console.log(this.checkoutFormGroup.get('customer')?.value.email);
    console.log(
      this.checkoutFormGroup.get('shippingAddress')?.value.country.name
    );
    console.log(
      this.checkoutFormGroup.get('shippingAddress')?.value.state.name
    );
    console.log(
      this.checkoutFormGroup.get('billingAddress')?.value.country.name
    );
    console.log(this.checkoutFormGroup.get('billingAddress')?.value.state.name);
  }

  // getter methods to access form controls
  // customer getters
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  // shipping address getters
  get shippingStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingZip() {
    return this.checkoutFormGroup.get('shippingAddress.zip');
  }
  get shippingCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  // billing address getters
  get billingStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingZip() {
    return this.checkoutFormGroup.get('billingAddress.zip');
  }
  get billingCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  // credit card getters
  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  // get creditCardExpMonth() {
  //   return this.checkoutFormGroup.get('creditCard.expMonth');
  // }
  // get creditCardExpYear() {
  //   return this.checkoutFormGroup.get('creditCard.expYear');
  // }
}
