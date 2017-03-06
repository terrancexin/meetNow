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
        <Link to='groups' className='create-button'>Start a MeetNow!</Link>
        <div className='footer-icon-box'>
          <a href='https://github.com/txin001' className='gh-footer-icons footer-icons' target="_blank"><img src={window.assets.githubImage}/></a>
          <a href='https://www.linkedin.com/in/txin001' className='linked-footer-icons footer-icons' target="_blank"><img src={window.assets.linkedinImage}/></a>
        </div>
        {buttons}

        <Modal
          isOpen={this.state.modalType === "signup"}
          onRequestClose={this.closeModal}
          contentLabel="signup-modal">
          <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")}/>
        </Modal>

        <Modal
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
