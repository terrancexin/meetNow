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

export const fetchEvent = id => {
  return (
    $.ajax({
      method: 'GET',
      url: `api/events/${id}`
    })
  );
};


export const attendEvent = (eventId) => {
  return (
    $.ajax({
      method: 'POST',
      url: '/api/rsvps',
      data: { rsvp: { event_id: eventId} }
    })
  );
};

export const leaveEvent = (eventId) => {
  return (
    $.ajax({
      method: 'DELETE',
      url: '/api/rsvps',
      data: { event_id: eventId }
    })
  );
};
