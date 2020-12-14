const ALL_LOCATIONS =  {
  id: '**ALL_LOCATIONS**',
  locationName: 'All locations',
  services: []
};

const OPTIONS = {
  Caseworkers: {
    ALL: {
      idamId: '**ALL_CASEWORKERS**',
      firstName: 'All',
      lastName: 'caseworkers',
      email: undefined,
      location: ALL_LOCATIONS
    },
    UNASSIGNED: {
      idamId: '**NO_CASEWORKER_ASSIGNED**',
      firstName: 'None',
      lastName: '(unassigned tasks)',
      email: undefined,
      location: ALL_LOCATIONS
    }
  },
  Locations: {
    ALL: ALL_LOCATIONS
  }
};

const SESSION = {
  AvailableTasks: 'availableTasksFilter',
  TaskManager: 'taskManagerFilter'
};

export const FILTER_CONSTANTS = {
  Options: OPTIONS,
  Session: SESSION
};
