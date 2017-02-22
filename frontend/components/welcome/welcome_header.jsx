import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Modal from 'react-modal';
import AuthForm from '../authform/auth_form';
import modalStyle from './modalStyle';
import CreateGroupForm from '../groups/create_group_form';
import { openCreateGroup, closeCreateGroup,
         openAuthForm, closeAuthForm} from '../../actions/modal_actions';

class WelcomeHeader extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      modalOpen: false,
      formType: null,
      username: '',
      password: '',
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
    this.setGuest = this.setGuest.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openModalGroupForm = this.openModalGroupForm.bind(this);
  }

  handleLogout(e){
    e.preventDefault();
    this.props.logout();
    hashHistory.push('/');
  }

  toggleFormType(e) {
    e.preventDefault();
    if (this.state.formType === "login") {
      this.setState({ formType: "signup"});
    } else {
      this.setState({ formType: "login" });
    }
  }

  closeModal() {
    this.setState({ modalOpen: false});
  }

  openModal(formType) {
    return () => {
      this.props.openAuthForm();
      this.setState({ modalOpen: true, formType: formType});
    };
  }

  openModalGroupForm() {
    return () => {
      this.props.openCreateGroup();
      this.setState({modalOpen: true});
    };
  }



  setGuest() {
    this.setState({username: 'AppAcademy', password: '123abc'});
  }

  render(){

    return(
      <div className='welcome-header'>

          <section className='right-header-buttons'>
            <Link to='/groups' className='create-button'>Let's MeetNow!</Link>
            {
              this.props.loggedIn && <button onClick={this.openModalGroupForm()} className='new-group-button'>New Group</button>
            }

          </section>




          <div className='image-div'><Link to='/' className='logo'><img src={window.assets.logo} /></Link></div>
            { !this.props.loggedIn &&
              <ul className='header-buttons'>

                <li><button className='login-button' onClick={this.openModal("login")}>Log in</button></li>
                <li><button className='signup-button' onClick={this.openModal("signup")}>Sign up</button></li>
              </ul>
            }
            {
              this.props.loggedIn &&   <ul className='header-buttons'><li><button className='signup-button' onClick={this.openModal("signup")}>Profile</button></li></ul>
            }


        <Modal
           isOpen={this.state.modalOpen}
           onRequestClose={this.closeModal}
           style={modalStyle}
           contentLabel="header-modal"
         >
         {
           this.props.authForm && <AuthForm toggleForm={this.toggleFormType} formType={this.state.formType} closeModal={this.closeModal}/>
         }
         {
           this.props.groupForm && <CreateGroupForm closeModal={this.closeModal}/>
         }
       </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors,
  currentUser: state.session.currentUser,
  groupForm: state.modal.groupForm,
  authForm: state.modal.authForm
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  openCreateGroup: () => dispatch(openCreateGroup()),
  closeCreateGroup: () => dispatch(closeCreateGroup()),
  openAuthForm: () => dispatch(openAuthForm()),
  closeAuthForm: () => dispatch(closeAuthForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeHeader);
