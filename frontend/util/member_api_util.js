export const addUserToGroup = (userId, groupId) => {
  return $.ajax({
    method: 'POST',
    url: '/api/memberships',
    data: { membership: {user_id: userId, group_id: groupId} }
  });
};

export const removeUserFromGroup = userId => {
  return $.ajax({
    method: 'DELETE',
    url: `api/memberships/${userId}`
  });
};
