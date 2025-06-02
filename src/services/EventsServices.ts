import requests from "./Instance";
const EventsServices = {
  getEvent: async () => {
    return requests.get(`/public/events`);
  },

  getLastEvent: async () => {
    return requests.get(`/public/lastevent`);
  },
};
export default EventsServices;
