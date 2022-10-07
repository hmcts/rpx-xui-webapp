import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_JURISDICTIONS = gql`
  query {
    jurisdictions {
      name
      id
      description
      caseTypes {
        id
        description
        version
        name
        states {
          id
          name
          description
          order
          title_display
          acls {
            create
            delete
          }
        }
        acls {
          create
          delete
        }
        events {
          id
          name
        }
      }
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-graphql-apollo';
  jurisdictions: any[] = [];
  caseTypes: any[] = [];
  states: any[] = [];
  selected: string = '';
  caseType: string = '';
  stateO: string = '';
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: GET_JURISDICTIONS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.jurisdictions = data.jurisdictions;
      });
  }

  onJurisdictionChange(sel: any) {
    if (sel) {
      const types = this.jurisdictions.filter((item) => item.id === sel.id);
      this.caseTypes = types[0].caseTypes;
    }
  }

  onCasetypeChange(sel: any) {
    if (sel) {
      if (sel) {
        const statesList = this.caseTypes.filter((item) => item.id === sel.id);
        this.states = statesList[0].states;
      }
    }
  }

  onApplyClick() {
    console.log(
      'I would normally go and get the list of cases that match my selections above...'
    );
  }
}
