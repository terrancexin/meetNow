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
import EventsIndex from '../events/events_index';
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
    if (this.props.params.groupId !== newProps.params.groupId || !newProps.group.users) {
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

  checkJoined() {
    if (this.props.currentUser) {
      if (Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`)) {
        return true;
      }
    } else {
      return false;
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

  checkChildren() {
    if (this.props.children) {
      return <div className='mid-content-box'>{this.props.children}</div>;
    } else {
      return (
        <div className='mid-content-box'>
            <div className="group-show-description">
              <h1>Welcome!</h1>
              <p>{this.props.group.description}</p>
            </div>

        {
          this.props.group.events && <EventsIndex
                                      handleJoinGroup={this.handleJoinGroup}
                                      isMember={this.checkJoined()}
                                      events={this.props.group.events}
                                      groupId={this.props.group.id}
                                      currentUser={this.props.currentUser}/>
        }

        {
          !this.props.group.events && <div className='no-events-box'><div className='display-no-events'>No Upcoming Events</div><button className='create-event'>Create an Event</button></div>
        }

    </div>
  );
    }
  }




  render () {

    // fix this.props.group.events bc I can't go to the page if group has no events
    if (!this.props.group || !this.props.group.users) {
          return <div className="loading">Loading...</div>;

    } else {
      return (
        <div className='width-setter'>
        <div className='group-show-page'>

          <div className='group-name-nav'>
            <h1 className='group-name'>{this.props.group.name}</h1>
            <div className='group-header-buttons'>

              <ul className='left-side-buttons'>
                <Link to={`/groups/${this.props.group.id}`}><li>Home</li></Link>
                <li>Members</li>
                <li>Photos</li>
              </ul>
              {this.correctButton()}
            </div>
          </div>

          <div className='content-container'>
            <ul className='group-side-bar-info'>
              <img className='group-side-bar-pic' src={this.props.group.about} />


              <section className='side-bar-text-box'>
                <div className='text-info-inner-box'>
                  <div className='side-bar-location'>{this.props.group.location}</div>
                  <li className='side-founded'>Founded March 17, 2017</li>
                  <div className='side-aboutus'><li>About us...</li></div>

                    <li className='side-bar-info'>
                      <div>
                        Events
                      </div>
                      <div>
                        {this.props.group.event_count}
                      </div>
                    </li>

                    <li className='side-bar-info'>
                      <div>
                        Members
                      </div>
                      <div>
                        {this.props.group.member_count}
                      </div>
                    </li>


                    <div className='group-members-list'>
                      <ul className='group-members'>
                      {
                        Object.keys(this.props.group.users).map(id => (

                          <div className='member-and-pic-box' key={id}>
                            <div className='pro-pic-box'>
                              <img className='pro-pic' src={window.assets.memberlistImage} />
                            </div>

                            <div className='member-name'>
                              {this.props.group.users[id].name}
                            </div>

                          </div>
                        ))
                      }
                      </ul>
                    </div>

                    </div>
                </section>

              </ul>

              {this.checkChildren()}


              <Modal
                 isOpen={this.props.authForm}
                 onRequestClose={this.props.closeAuthForm}
                 style={modalStyle}
                 contentLabel="header-modal">

                  <AuthForm toggleForm={this.toggleFormType} formType={this.state.formType} closeModal={this.props.closeAuthForm}/>
              </Modal>

          </div>

        </div>

        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // 
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
