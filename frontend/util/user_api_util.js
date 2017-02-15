export const updateUser = (user, success, errors) => {
  $.ajax({
    method: "PATCH",
    url: `api/users/${user.id}`,
    success,
    errors
  });
};

export const getLocation = (url, success) => {
  $.ajax({
    url: url,
    success
  });
};

export const fetchAllusers = (success) => {
  $.ajax({
    url: 'api/users',
    success
  });
};

export const fetchUser = (id, success, errors) => {
  $.ajax({
    url: `api/users/${id}`,
    success,
    errors
  });
};
