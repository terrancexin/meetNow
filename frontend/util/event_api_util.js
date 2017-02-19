export const fetchAllEvents = (group) => (
  $.ajax({
    method: 'GET',
    url: `/api/groups/${group.id}/events`
  })
);
