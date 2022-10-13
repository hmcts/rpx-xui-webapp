import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jurisdictions: any[] = [];
  caseTypes: any[] = [];
  states: any[] = [];
  selected: string = '';
  caseType: string = '';
  stateO: string = '';

  title = 'XUI API Performance demo';

  ngOnInit() {
    axios
      .get('http://127.0.0.1:3000/jurisdictions')
      .then((response: any) => {
        this.jurisdictions = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onJurisdictionChange(sel: string) {
    if (!sel) {
      this.caseTypes = [];
      this.states = [];
      return;
    }
    axios
      .get('http://127.0.0.1:3000/casetypes')
      .then((response: any) => {
        this.caseTypes = response.data;
      })
      .catch((error) => {
        this.caseTypes = [];
        this.states = [];
        console.error(error);
      });
  }

  onCasetypeChange(sel: string) {
    if (!sel) {
      this.states = [];
      return;
    }
    axios
      .get('http://127.0.0.1:3000/states')
      .then((response: any) => {
        this.states = response.data;
      })
      .catch((error) => {
        this.states = [];
        console.error(error);
      });
  }

  onApplyClick() {
    console.log(
      'I would normally go and get the list of cases that match my selections above...'
    );
  }
}
