export const updateUser = (currentUser) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${currentUser.id}`,
    data: {user: currentUser}
  });
};
