import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-error-message',
    templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
    @Input() public title: string;
    @Input() public errorDesc: string;
    constructor() {
    }
}
