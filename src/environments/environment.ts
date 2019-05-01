// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// isDebugMode - 'OFF' 'DEBUG' 'WARN 'ERROR'

export const environment = {
  production: false,
  loggingLevel: 'DEBUG',
  CaseEditorConfig: {
    api_url: '/aggregated',
    case_data_url: '/data',
    document_management_url: '/documents',
    login_url: '/login',
    oauth2_client_id: 'ccd_gateway',
    postcode_lookup_url: '/addresses?postcode=${postcode}',
    remote_document_management_url: '/documents',
    payments_url: '/payments',
    activity_batch_collection_delay_ms: 1,
    activity_next_poll_request_ms: 5000,
    activity_retry: 5,
    activity_url: '',
    activity_max_request_per_batch: 25,
    print_service_url: '/print',
    remote_print_service_url: '/remote_print'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
