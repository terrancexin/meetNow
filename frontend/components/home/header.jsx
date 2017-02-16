import React from 'react';
import Modal from 'react-modal';
import { Link, hashHistory } from 'react-router';
// import FormModal from '../authform/modal';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = { modalIsOpen: false };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

  }

  closeModal () {
    this.setState( { modalIsOpen: false });
  }

  handleSignOut(e){
    e.preventDefault();
    this.props.logout();
    hashHistory.push('/');
  }

  openModal () {
    this.setState( { modalIsOpen: true });
  }

  render(){
    return(
      <nav className="main-nav">
        <Link to='/' className='btn create-button'>Start a meetNow!</Link>
        <Link to='/' className='header-logo'>meetNow!</Link>
        <div>
          <label>Language</label>
          <Link to='/login'
            className='btn login-button'>Log in</Link>
          <Link onClick={this.openModal} to='/signup' className='btn signup-button'>Sign up</Link>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"

        >
        <h1>This is Modal!</h1>

        </Modal>
      </nav>
    );
  }
}

export default Header;
