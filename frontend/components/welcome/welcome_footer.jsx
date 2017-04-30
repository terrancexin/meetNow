import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Modal from 'react-modal';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';

class WelcomeFooter extends React.Component {
  constructor(){
    super();
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = { modalType: "" };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalType: form });
    };
  }

  closeModal() {
    this.setState({ modalType: false});
  }

  handleSignOut(e){
    e.preventDefault();
    this.props.logout();
    if (this.props.pathname !== "/") {
      hashHistory.push('/');
    }
  }


  render(){
    let buttons;
    if (this.props.loggedIn){
      buttons =  (<button className='footer-button' onClick={this.handleSignOut}>Log out</button>);
    } else {
      buttons = (<button className='footer-button' onClick={this.handleModalOpen("login")}>Log in</button> );
    }

    return(
      <div className='footer-buttons'>
        <Link to='groups' className='create-button'>Join a Group</Link>
        <div className='footer-icon-box'>
            <div className="footer-icons">
              <Link href="https://www.terrancexin.com" title="www" target="_blank"><i className="fa fa-globe"></i></Link>
              <Link href="https://github.com/terrancexin/meetNow" title="github" target="_blank"><i className="fa fa-github"></i></Link>
              <Link href="https://www.linkedin.com/in/terrancexin/" title="linkedin" target="_blank" ><i className="fa fa-linkedin"></i></Link>
              <Link href="https://angel.co/terrancexin" title="angellist" target="_blank" ><i className="fa fa-angellist"></i></Link>
           </div>
           <div className='copyright'>&copy; 2017 Built by Terrance Xin</div>
        </div>
        {buttons}

        <Modal
          overlayClassName='modal-overlay'
          className='modal-container modal-large-signup'
          isOpen={this.state.modalType === "signup"}
          onRequestClose={this.closeModal}
          contentLabel="signup-modal">
          <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")}/>
        </Modal>

        <Modal
          overlayClassName='modal-overlay'
          className='modal-container'
          isOpen={this.state.modalType === "login"}
          onRequestClose={this.closeModal}
          contentLabel="login-modal">
          <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
  loggedIn: !!state.session.currentUser,
  errors: state.session.errors,
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeFooter);
