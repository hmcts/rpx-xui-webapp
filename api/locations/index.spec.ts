// need to test function below

/* req = {
  body: {
    searchTerm: 'gla' (for example, searching for Glasgow),
    serviceIds: 'IA,SSCS,Divorce',
    locationType: null (don't really care about this data for what we're testing),
    userLocations: [{service: 'IA', locations: [{id: '1', name: 'Manchester'}, {id: '2', name: 'Birmingham'}]}]
  }
} */

/**
 * @description getLocations from service ID/location type/search term
 * @overview API sample: /api/locations/getLocations?serviceIds=SSCS,IA&locationType=hearing&searchTerm=CT91RL
 * @example service = SSCS | SSCS,IA split with ','
 * @example locationType = optional | hearing | case_management
 * @example searchTerm = any search term for postcode | site name | venue name |court name | court address etc.
 */
 /** export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  const searchTerm = req.body.searchTerm;
  const serviceIds = req.body.serviceIds;
  const locationType = req.body.locationType;
  const userLocations = req.body.userLocations;
  // stops locations from being gathered if they are base locations passed in without relevant services
  if ((!serviceIds || serviceIds.length === 0) && userLocations) {
    res.status(200).send([]);
  }
  const serviceIdArray = serviceIds.split(',');
  const courtTypeIds = getCourtTypeIdsByService(serviceIdArray); e.g. serviceIdArray = ['IA', 'SSCS', 'Divorce'], courtTypeIds = ['4', '23', '41']
  // tslint:disable-next-line:max-line-length
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${courtTypeIds}`;
  // const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}`;
  try {
    const headers = setHeaders(req);
    const response: AxiosResponse<any> = await http.get(markupPath, { headers });
    // response = {data: (list of LocationModels)}
    let results: LocationModel[] = response.data;
    if (locationType === LocationTypeEnum.HEARING) {
      results = results.filter(location => location.is_hearing_location === 'Y');
    } else if (locationType === LocationTypeEnum.CASE_MANAGEMENT) {
      results = results.filter(location => location.is_case_management_location === 'Y');
    }
    // add in check to make sure user only able to select base locations if specified
    userLocations.forEach(userLocation => {
      const courtTypes = getCourtTypeIdsByService([userLocation.service]);
      const locationIds = getLocationIdsFromLocationList(userLocation.locations);
      results = results.filter(thisResult => !(courtTypes.includes(thisResult.court_type_id))
       || locationIds.includes(thisResult.epimms_id));
    })
    res.status(response.status).send(results);
  } catch (error) {
    next(error);
  }
} */

// Scenario 1: User searches for Glasgow, 'gla' - no userLocations - user should be able to search all 'gla' locations in all services, e.g. Glastonbury, Glacier bay

// Scenario 2: User searches for Glasgow, 'gla' - userLocation 'Glasgow' in 'IA' - user should be able to search only Glasgow for IA, 'gla' locations for other services

// Scenario 3: User searches for Glasgoq, 'gla' - userLocations 'Glastonbury' in 'IA', 'Glacier bay' in 'SSCS' - user should be able to search only for Glastonbury in IA, Glacier bay in SSCS