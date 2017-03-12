import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGroup, updateGroup, deleteGroup } from '../../actions/group_actions';
import { addUserToGroup, removeUserFromGroup } from '../../actions/member_actions';
import Modal from 'react-modal';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import { Link } from 'react-router';
import EventsIndex from '../events/events_index';

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
  }

  componentWillReceiveProps(newProps) {
    if (newProps.group === undefined) { return; }

    if (this.props.params.groupId !== newProps.params.groupId || !newProps.group.users) {
      this.props.fetchSingleGroup(newProps.params.groupId);
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

        { !this.props.group.events && <div className='no-events-box'><div className='display-no-events'>No Upcoming Events</div><button className='create-event'>Create an Event</button></div> }

    </div>
  );
    }
  }




  render () {
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
                              <img className='pro-pic' src={this.props.group.users[id].image_url} />
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
  });
};

const mapDispatchToProps = dispatch => {
  return (
    {
      fetchSingleGroup: (id) => dispatch(fetchSingleGroup(id)),
      addUserToGroup: (userId, groupId) => dispatch(addUserToGroup(userId, groupId)),
      removeUserFromGroup: (userId, groupId) => dispatch(removeUserFromGroup(userId, groupId)),
      deleteGroup: id => dispatch(deleteGroup(id)),
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsShow);
