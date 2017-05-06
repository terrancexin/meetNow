export const createGroup = (group) => {
  return (
    $.ajax({
      method: 'POST',
      url: '/api/groups',
      data: { group }
    })
  );
};

export const fetchAllGroups = (filter) => (
  $.ajax({
    method: 'GET',
    url: '/api/groups',
    data: {filter}
  })
);

export const fetchSingleGroup = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/groups/${id}`
  });
};

export const deleteGroup = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/groups/${id}`
  });
};

export const updateGroup = (group, id) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/groups/${id}`,
    data: { group }
  });
};
