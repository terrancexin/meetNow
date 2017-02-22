import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGroup, updateGroup, deleteGroup } from '../../actions/group_actions';
import { addUserToGroup, removeUserFromGroup } from '../../actions/member_actions';
import Modal from 'react-modal';
import modalStyle from '../welcome/modalStyle';
import CreateGroupForm from './create_group_form';
import WelcomeHeader from '../welcome/welcome_header';
import WelcomeFooter from '../welcome/welcome_footer';
import { Link } from 'react-router';
import Events from '../events/events';
import AuthForm from '../authform/auth_form';
import { openAuthForm, closeAuthForm } from '../../actions/modal_actions';

class GroupsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      formType: 'login'
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleJoinGroup = this.handleJoinGroup.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
  }

  toggleFormType(e) {
    e.preventDefault();
    if (this.state.formType === "login") {
      this.setState({ formType: "signup"});
    } else {
      this.setState({ formType: "login" });
    }
  }

  componentDidMount() {
    this.props.fetchSingleGroup(this.props.params.groupId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.groupId !== newProps.params.groupId) {
      this.props.fetchSingleGroup(newProps.params.groupId);
    }
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  handleJoinGroup() {
    if (this.props.currentUser) {
      this.props.addUserToGroup(this.props.currentUser.id, this.props.group.id);
    } else {
      this.props.openAuthForm();
    }

  }


  handleLeaveGroup () {
    if (this.props.currentUser) {
      this.props.removeUserFromGroup(this.props.currentUser.id, this.props.group.id);
    }
  }

  correctButton() {
  if (this.props.currentUser) {
    if (Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`)) {
      return <button onClick={this.handleLeaveGroup} className="join-group-button">Leave</button>;
    } else {
      return <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>;
      }
    }  else {
      return <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>;
    }

  }




  render () {
    if (!this.props.group || !this.props.group.users) {
          return <div className="loading">Loading...</div>;

    } else {
      return (

        <div className='group-show-page'>

          <div className='group-name-nav'>
            <h1 className='group-name'>{this.props.group.name}</h1>

            <div className='group-header-buttons'>

              <ul className='left-side-buttons'>
                <li>Home</li>
                <li>Members</li>
                <li>Photos</li>
              </ul>
              {this.correctButton()}
            </div>
          </div>

          <div className='content-container'>
            <ul className='group-side-bar-info'>
              <li>{this.props.group.location}</li>
              <li>{this.props.group.member_count}</li>
            </ul>

                <div className="group-show-about">
                  {this.props.group.description}
                    <ul className='group-members'>
                    {
                      Object.values(this.props.group.users).map(user => (
                        <li key={user.id}>
                          {user.first_name}
                        </li>
                      ))
                    }
                    </ul>
                </div>


              <div>EVENTS</div>
          </div>

            {this.props.children}
        </div>

      );
    }
  }
}


const mapStateToProps = (state, ownProps) => {
  // debugger
  return ({
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    group: state.groups[ownProps.params.groupId],
    authForm: state.modal.authForm
  });
};

const mapDispatchToProps = dispatch => {
  return (
    {
      fetchSingleGroup: (id) => dispatch(fetchSingleGroup(id)),
      addUserToGroup: (userId, groupId) => dispatch(addUserToGroup(userId, groupId)),
      removeUserFromGroup: (userId, groupId) => dispatch(removeUserFromGroup(userId, groupId)),
      deleteGroup: id => dispatch(deleteGroup(id)),
      openAuthForm: () => dispatch(openAuthForm()),
      closeAuthForm: () => dispatch(closeAuthForm())
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsShow);
