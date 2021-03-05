const ALL_LOCATIONS =  {
  location_id: '**ALL_LOCATIONS**',
  location: 'All locations',
  is_primary: true,
  services: []
};

const OPTIONS = {
  Caseworkers: {
    ALL: {
      id: '**ALL_CASEWORKERS**',
      first_name: 'All',
      last_name: 'caseworkers',
      email_id: undefined,
      base_location: [ALL_LOCATIONS]
    },
    UNASSIGNED: {
      id: '**NO_CASEWORKER_ASSIGNED**',
      first_name: 'None',
      last_name: '(unassigned tasks)',
      email_id: undefined,
      base_location: [ALL_LOCATIONS]
    }
  },
  Locations: {
    ALL: ALL_LOCATIONS
  }
};

// TODO: Remove these after integrating with API.
const TAYLOR_HOUSE = {
  location_id: 'a', location: 'Taylor House', services: [ 'a' ]
};
const JOHN_SMITH = {
  first_name: 'John',
  last_name: 'Smith',
  id: '1',
  email_id: 'john.smith@caseworkers.gov.uk',
  base_location: [TAYLOR_HOUSE]
};

const SESSION = {
  AvailableTasks: 'availableTasksFilter',
  TaskManager: 'taskManagerFilter'
};

export const FILTER_CONSTANTS = {
  Options: OPTIONS,
  Session: SESSION,
  Defaults: {
    LOCATION: TAYLOR_HOUSE,
    CASEWORKER: JOHN_SMITH
  }
};
