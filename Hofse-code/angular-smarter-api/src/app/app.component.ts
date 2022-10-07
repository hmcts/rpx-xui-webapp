import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  key = 'AIzaSyCXqqbXQfZds6-C1kdc4KmHxpsIsjxitFQ';
  jurisdictions: string[] = [];
  caseTypes: string[] = [];
  states: string[] = [];
  selected: string = '';
  caseType: string = '';
  stateO: string = '';

  jurisdictionOptions = {
    params: {
      part: 'snippet',
      maxResults: '5',
      key: this.key,
      q: 'top uk artists',
    },
    headers: {},
  };

  title = 'XUI API Performance demo';

  ngOnInit() {
    axios
      .get(
        'https:www.googleapis.com/youtube/v3/search',
        this.jurisdictionOptions
      )
      .then((response) => {
        const data = response.data.items.reduce(
          (acc: any[], current: any) => [...acc, current.snippet.title],
          []
        );
        this.jurisdictions = data.sort();
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
      .get('https:www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: '5',
          key: this.key,
          q: `${sel}`,
        },
        headers: {},
      })
      .then((response) => {
        const data = response.data.items.reduce(
          (acc: any[], current: any) => [...acc, current.snippet.title],
          []
        );
        this.caseTypes = data.sort();
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
      .get('https:www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: '5',
          key: this.key,
          q: `${sel}`,
        },
        headers: {},
      })
      .then((response) => {
        const data = response.data.items.reduce(
          (acc: any[], current: any) => [...acc, current.snippet.title],
          []
        );
        this.states = data.sort();
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
