import React from 'react';
import { Link, hashHistory } from 'react-router';

class Footer extends React.Component {
  constructor(props){
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(e){
    e.preventDefault();
    this.props.logout();
    hashHistory.push('/');
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
      <nav className="footer-nav">
        <Link to='/' className='btn create-button'>Start a meetNow!</Link>

        {buttons}
      </nav>
    );
  }
}

export default Footer;
