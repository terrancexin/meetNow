export const fetchAllEvents = () => {
  return ($.ajax({
    method: 'GET',
    url: 'api/events'
  }));
};

export const createEvent = event => (
  $.ajax({
    method: 'POST',
    url: 'api/events',
    data: { event }
  })
);
