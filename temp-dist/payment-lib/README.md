# @hmcts/ccpay-web-component
This package contains web components ready to be used and imported by into Angular 6 projects.

## How to install
1. `npm i @hmcts/ccpay-web-component`
2. Import the module into your angular application 
    ```
    import {PaymentLibModule} from 'payment-lib';
    (...)
    imports: [
        (...) ,
        PaymentLibModule
      ]
    (...)
    ```
3. Add the tag into your project and pass in the url to the backend api:
`<ccpay-payment-lib [API_ROOT]=“’http://localhost:1080'“></ccpay-payment-lib>`

