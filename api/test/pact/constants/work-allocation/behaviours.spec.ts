export const SUCCESS = {};
export const ALREADY_DONE = {behaviour: 'already-done'};
export const BAD_REQUEST = {behaviour: 'bad-request'};
export const FORBIDDEN = {behaviour: 'forbidden'};
export const UNSUPPORTED = {behaviour: 'unsupported'};
// TODO: Should be behaviour 'server-error'
export const SERVER_ERROR = {behaviour: 'unsupported'};

export const BEHAVIOURS = {
  SUCCESS,
  ALREADY_DONE,
  BAD_REQUEST,
  FORBIDDEN,
  UNSUPPORTED,
  SERVER_ERROR
};
