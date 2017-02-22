import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Modal from 'react-modal';
import AuthForm from '../authform/auth_form';
import modalStyle from './modalStyle';

class WelcomeFooter extends React.Component {
  constructor(props){
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = { modalOpen: false, formType: 'login' };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true});
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


  render(){
    let buttons;
    if (this.props.loggedIn){
      buttons =  (<button className='footer-logout-button' onClick={this.handleSignOut}>Log out</button>);
    } else {
      buttons = (<button className='footer-login-button' onClick={this.openModal}>Log in</button> );
    }

    return(
      <div className='footer-buttons'>
        <Link to='groups' className='create-button'>Start a MeetNow!</Link>
        {buttons}

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel='footer-login-modal'
          >
          <AuthForm
            formType={this.state.formType}
            closeModal={this.closeModal}
            />
        </Modal>
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
