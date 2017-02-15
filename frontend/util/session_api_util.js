export const login = (user, success, error) => {
  $.ajax({
    method: 'post',
    url: 'api/session',
    data: {user},
    success,
    error
  });
};

export const logout = (success, error) => {
  $.ajax({
    method: 'delete',
    url: 'api/session',
    success,
    error: () => {
      console.log("Logout error in SessionApiUtil#logout");
    }
  });
};

export const signup = (user, success, error) => {
  $.ajax({
    type: 'post',
    url: 'api/users',
    data: {user},
    success,
    error
  });
};

export const createImage = (image, success, userId) => {
  $.ajax({
    method: "PATCH",
    url: `api/users/${userId}`,
    data: {user: {profile_img: image}},
    success
  });
};
