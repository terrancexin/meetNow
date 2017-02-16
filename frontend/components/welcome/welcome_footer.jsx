import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

class WelcomeFooter extends React.Component {
  constructor(props){
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(e){
    e.preventDefault();
    this.props.logout();
    if (this.props.pathname !== "/") {

      hashHistory.push('/');
    }
  }

  render(){
    const text = this.props.loggedIn ? "Log out" : "Log in";
    let buttons;
    if (this.props.loggedIn){
      buttons = (<Link onClick={this.handleSignOut}>Sign Out</Link>);
    } else {
      buttons = (<Link to="/login">Log in</Link>);
    }

    return(
      <div>
        <Link to='/' className='create-button'>Start a meetNow!</Link>
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors,
  currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeFooter);
