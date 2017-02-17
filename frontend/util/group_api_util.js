export const createGroup = (group) => (
  $.ajax({
    method: 'POST',
    url: 'api/groups',
    data: { group }
  })
);

export const getAllGroups = () => (
  $.ajax({
    method: 'GET',
    url: 'api/groups'
  })
);

export const getSingleGroup = id => (
  $.ajax({
    method: 'GET',
    url: `api/groups/${id}`
  })
);
