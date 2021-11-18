import { bookings } from './data/bookings.mock.data';

export const getBookings = (proxyReq, req, res) => {
    // when am/booking url is developed , there will be switch flag implementation to get responds from url or from mock data
    if (!bookings) {
        return res.status(404).write('{"errorMessage": "Resource Not found}"');
      } else {
      return res.send(bookings);
      }
}
