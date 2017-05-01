import React from 'react';

class ProfileModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='profile-form-box' >
        <div className='profile-buttons-box'>
          <button className='profile-buttons' onClick={this.props.handleProfileButton(this.props.currentId)}>Profile</button>
          <button className='profile-buttons' onClick={this.props.handleLogout}>Log out</button>
        </div>
      </div>
    );
  };
}

export default ProfileModal;
