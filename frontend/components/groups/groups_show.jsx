import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGroup, updateGroup, deleteGroup } from '../../actions/group_actions';
import { fetchSingleGroupEvents } from '../../actions/event_actions';
import { addUserToGroup, removeUserFromGroup } from '../../actions/member_actions';
import Modal from 'react-modal';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import { Link } from 'react-router';
import EventsIndex from '../events/events_index';
import CreateEventForm from '../forms/create_event_form';

class GroupsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalType: ''};
    this.closeModal = this.closeModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);

    this.handleJoinGroup = this.handleJoinGroup.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleGroup(this.props.params.groupId);
    this.props.fetchSingleGroupEvents(this.props.params.groupId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.group === undefined) { return; }

    if (this.props.params.groupId !== newProps.params.groupId || !newProps.group.users) {
      this.props.fetchSingleGroup(newProps.params.groupId);
      this.props.fetchSingleGroupEvents(newProps.params.groupId);
    }
  }

  closeModal() {
    this.setState({ modalType: false});
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalType: form });
    };
  }

  handleJoinGroup() {
    if (this.props.loggedIn) {
      this.props.addUserToGroup(this.props.currentUser.id, this.props.group.id);
    } else {
      this.handleModalOpen('login')();
    }
  }

  checkJoined() {
    if (this.props.loggedIn) {
      if (Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`)) {
        return true;
      }
    } else {
      return false;
    }
  }

  handleLeaveGroup () {
    if (this.props.loggedIn) {
      this.props.removeUserFromGroup(this.props.currentUser.id, this.props.group.id);
    }
  }

  toggleJoinRsvp() {
  if (this.props.loggedIn) {
    if (Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`)) {
      return <button onClick={this.handleLeaveGroup} className="join-group-button">Leave Group</button>;
    } else {
      return <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>;
      }
    }  else {
      return <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>;
    }

  }

  render () {
    if (!this.props.group || !this.props.group.users) {
      return (<div className='group-index-box'><img className='loading-spinner' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/></div>);
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
                <button onClick={this.handleModalOpen('event')}><li>Create an Event</li></button>
              </ul>
              {this.toggleJoinRsvp()}
            </div>
          </div>

          <div className='content-container'>
            <ul className='group-side-bar-info'>
              <img className='group-side-bar-pic' src={this.props.group.photo_url} />

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
                              <Link to={`/profile/${id}`}><img className='pro-pic' src={this.props.group.users[id].image_url} /></Link>
                            </div>

                            <Link to={`/profile/${id}`}><div className='member-name'>
                              {this.props.group.users[id].name}
                            </div></Link>

                          </div>
                        ))
                      }
                      </ul>
                    </div>

                  </div>
                </section>

              </ul>

              {
                this.props.children && <div className='mid-content-box'>{this.props.children}</div>
              }

              {
                !this.props.children && <div className='mid-content-box'>
                                          <div className="group-show-description">
                                            <h1>Welcome!</h1>
                                            <p>{this.props.group.description}</p>
                                          </div>
                                          <EventsIndex
                                            handleJoinGroup={this.handleJoinGroup}
                                            isMember={this.checkJoined()}
                                            currentUser={this.props.currentUser}/>
                                      </div>
              }

          </div>
        </div>


        <Modal
          overlayClassName='modal-overlay'
          className='modal-container'
          isOpen={this.state.modalType === "login"}
          onRequestClose={this.closeModal}
          contentLabel="login-modal">
          <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")}/>
        </Modal>

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
          className='modal-container large-modal'
          isOpen={this.state.modalType === "event"}
          onRequestClose={this.closeModal}
          contentLabel="event-modal">
          <CreateEventForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("event")}/>
        </Modal>

        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    loggedIn: !!state.session.currentUser,
    currentUser: state.session.currentUser,
    group: state.groups[ownProps.params.groupId],
    events: state.events
  });
};

const mapDispatchToProps = dispatch => {
  return (
    {
      fetchSingleGroup: (id) => dispatch(fetchSingleGroup(id)),
      addUserToGroup: (userId, groupId) => dispatch(addUserToGroup(userId, groupId)),
      removeUserFromGroup: (userId, groupId) => dispatch(removeUserFromGroup(userId, groupId)),
      deleteGroup: id => dispatch(deleteGroup(id)),
      fetchSingleGroupEvents: id => dispatch(fetchSingleGroupEvents(id))
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsShow);
