export enum TaskFieldType {
  STRING,
  DATE_DUE,              // Display as fancy colour coded date
  DATE_AGE_DAYS,         // Display as number of days since date
  DATE,                  // Display as DD/MM/YYYY date
  DATETIME,              // Display as DD/MM/YYYY HH:MM date time (24 hour clock)
  BOOLEAN,               // Display as Yes, No, or blank
  IDAM_ID,               // Look up IDAM ID and convert to Firstname Lastname
  INTEGER,               // Convert to nearest whole numer
  DECIMAL_2,             // Convert to floating point number, rounded to 2 dp
  URL,                   // Contains a link (opens in the same window/tab)
  IMAGE,                 // Contains a image
  BADGE,                 // Display an image based on row data
  LOCATION_ID,           // Look up location name via service,
  CASE_REFERENCE,        // Displays a link to a case with the case reference as the label
  CASE_REFERENCE_STRING, // Displays formatted case reference without link
  DERIVED_ICON           // Displays an icon if conditions satisfied
}
