export const addUserToGroup = (userId, groupId) => {
  return $.ajax({
    method: 'POST',
    url: '/api/memberships',
    data: { membership: {user_id: userId, group_id: groupId} }
  });
};

export const removeUserFromGroup = (userId, groupId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/memberships`,
    data: { user_id: userId, group_id: groupId}
  });
};
