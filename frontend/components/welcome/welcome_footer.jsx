import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

// Forms
import Modal from 'react-modal';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';

class WelcomeFooter extends React.Component {
  constructor(){
    super();
    this.state = { modalOpen: false, modalType: "" };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalOpen: true, modalType: form });
    };
  }

  closeModal() {
    this.setState({ modalOpen: false});
  }

  handleSignOut(e){
    e.preventDefault();
    this.props.logout();
    if (this.props.pathname !== "/") {
      hashHistory.push('/');
    }
  }

  toggleFooterButton() {
    if (this.props.loggedIn){
      return (<button className='footer-button' onClick={this.handleSignOut}>Log out</button>);
    } else {
      return (<button className='footer-button' onClick={this.handleModalOpen("login")}>Log in</button> );
    }
  }

  render(){
    const forms = {
      'login': <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")} />,
      'signup': <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")} /> }

    return(
      <div className='footer-buttons'>
        <Link to='/new-group' className='join-group'>Create a Group</Link>
        <div className='footer-icon-box'>
            <div className="footer-icons">
              <Link className='footer-links-icon' href="https://www.terrancexin.com" title="www" target="_blank"><i className="fa fa-globe"></i></Link>
              <Link className='footer-links-icon' href="https://github.com/terrancexin/meetNow" title="github" target="_blank"><i className="fa fa-github"></i></Link>
              <Link className='footer-links-icon' href="https://www.linkedin.com/in/terrancexin/" title="linkedin" target="_blank" ><i className="fa fa-linkedin"></i></Link>
              <Link className='footer-links-icon' href="https://angel.co/terrancexin" title="angellist" target="_blank" ><i className="fa fa-angellist"></i></Link>
           </div>
           <div className='copyright'>&copy; 2017 Built by Terrance Xin</div>
        </div>

        { this.toggleFooterButton() }

        <Modal
          overlayClassName='modal-overlay'
          className={`modal-container modal-${this.state.modalType}`}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="header-modals">
          {forms[this.state.modalType]}
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
