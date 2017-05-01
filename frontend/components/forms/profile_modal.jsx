import React from 'react';

class ProfileModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='profile-form-box' >
        <div className='profile-buttons-box'>
          <button className='profile-buttons' >Profile</button>
          <button className='profile-buttons' >Log out</button>
        </div>
      </div>
    );
  };
}

export default ProfileModal;
