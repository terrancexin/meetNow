import React from 'react';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';

class ProfileForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='profile-form-box'>
        <button className='profile-button'>Profile</button>
        {
          this.props.loggedIn && <button className='profile-logout' onClick={this.props.logout}>Log out</button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);
