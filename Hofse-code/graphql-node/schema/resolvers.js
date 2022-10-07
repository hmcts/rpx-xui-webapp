const {
  JurisdictionsList,
  StatesList,
  CaseTypesList,
} = require("../schema/mockData");
const _ = require("lodash");

const { fetch } = require("undici");
const COOKIE =
  "xui-webapp=s%3AGBavW1mYOdC0F-V5IWDOFaCBX7f554qA.7IaRxpoNvPlINrQ%2BHZGza3OWEDE6bmL%2B1caF3aSdySU; rxVisitor=16649570098221V39VFUKLB98HRTK0SPRPU7IU1DLVIPC; __userid__=***REMOVED***; __auth__=eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJsdWtlc3VwZXJ1c2VyeHVpQG1haWxuZXNpYS5jb20iLCJjdHMiOiJPQVVUSDJfU1RBVEVMRVNTX0dSQU5UIiwiYXV0aF9sZXZlbCI6MCwiYXVkaXRUcmFja2luZ0lkIjoiOTUxOWRjNmItMjc2Ni00NWRlLTg1MDUtMDYzODJjNTViZTk5LTExNzEyNTIyMyIsImlzcyI6Imh0dHBzOi8vZm9yZ2Vyb2NrLWFtLnNlcnZpY2UuY29yZS1jb21wdXRlLWlkYW0tYWF0Mi5pbnRlcm5hbDo4NDQzL29wZW5hbS9vYXV0aDIvcmVhbG1zL3Jvb3QvcmVhbG1zL2htY3RzIiwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImF1dGhHcmFudElkIjoiakYwMkxaRTI2el9LQnNMMlVOdmp1bmlrSnhVIiwibm9uY2UiOiJYcFpTdEdYZ2ZaU3I5WGEzeF9vNXhqU24tSjNya05FUXVod2V3eTRlZnZJIiwiYXVkIjoieHVpd2ViYXBwIiwibmJmIjoxNjY1MDUxMzg5LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiY3JlYXRlLXVzZXIiLCJtYW5hZ2UtdXNlciIsInNlYXJjaC11c2VyIl0sImF1dGhfdGltZSI6MTY2NTA1MTM4OSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NjUwODAxODksImlhdCI6MTY2NTA1MTM4OSwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IkJnN0RzMEpaekFzYk0wandMMk9VckZYd19pRSJ9.yeKpqML9Vpkjofc9zmlaKcO6hMkqGg-MxhEztbfDRSg1vk3QxXvVCdO5d7jJMyK5MdAZNVXeYVs6hG6XsZ6XAzch3CqxF3agfWqiqPBeh-_hpvpMglsha_ONbWaBiD6xyMWKteHONLFBD4_InCo7fvxWneB6OJQDXG19lyKFrQnhpSCXlPwIuKYTebbKmRPQRMDFCIx8GbmoK-s_-xdYLaxc2_eYNJ0UWOuO6WKKN8snXsUQavpnEH-PNWZfatTOn6nm7OnXrhcIuGlY56UP6MiPbTrElt64FHvRkM4sYbcnM8L4mz_xURVkbxMY9yBBDNGgv0KEn3GEk2zX1Q_Y-g; dtCookie=v_4_srv_1_sn_2575N830JK2754L5RB2GPN74L1MOCBSM_perc_100000_ol_0_mul_1_app-3A9178369a29f961fb_1_app-3Ad95979fbf884c21e_1_rcs-3Acss_0; dtLatC=10; dtSa=-; XSRF-TOKEN=5VLTkypF-2kPIcoP0_H7Szh0Jgu8qBWn8Lig; rxvt=1664958853908|1664957009829; dtPC=1$557051942_741h19vDRFUWRPKDFWAKMQFKPUPKWLOMWEKUNPF-0e0";
const BASE_URL =
  "https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/:uid/jurisdictions?access=read";
const resolvers = {
  Query: {
    jurisdictions: async () => {
      const jurisdictions = await fetch(BASE_URL, {
        headers: { "Content-Type": "application/json", cookie: COOKIE },
      }).then((res) => res.json());
      return jurisdictions;
    },
    jurisdiction: (parent, args) => {
      const id = args.id;
      const jurisdiction = _.find(JurisdictionsList, { id });
      return jurisdiction;
    },
    casetypes: () => CaseTypesList,
    casetype: (parent, args) => {
      return _.filter(
        CaseTypesList,
        (casetype) => casetype.jurisdictionId === args.id
      );
    },
    states: () => StatesList,
    state: (parent, args) => {
      return _.filter(StatesList, (state) => state.caseTypeId === args.id);
    },
  },
};

module.exports = { resolvers };
