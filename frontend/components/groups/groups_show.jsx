import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { fetchSingleGroup, updateGroup, deleteGroup } from '../../actions/group_actions';
import { fetchSingleGroupEvents } from '../../actions/event_actions';
import { addUserToGroup, removeUserFromGroup } from '../../actions/member_actions';
import EventsIndex from '../events/events_index';

// Forms
import Modal from 'react-modal';
import LogInForm from '../forms/login_form';
import SignUpForm from '../forms/signup_form';
import CreateEventForm from '../forms/create_event_form';
import GroupMap from './group_map';
import FounderProfile from '../profile/founder_profile.jsx';

class GroupsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false,
                   modalType: "",
                   areYouSure: false };
    this.closeModal = this.closeModal.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);

    this.handleJoinGroup = this.handleJoinGroup.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);

    this.toggleAreYouSure = this.toggleAreYouSure.bind(this);
    this.handleAreYouSure = this.handleAreYouSure.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false});
  }

  handleModalOpen(form) {
    return () => {
      this.closeModal();
      this.setState({ modalOpen: true, modalType: form });
    };
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
      this.handleAreYouSure();
      hashHistory.push(`/groups/${this.props.group.id}`);
    }
  }

  toggleAreYouSure () {
    if (this.state.areYouSure) {
      return  { display: 'flex' };
    } else {
      return { display: 'none' };
    }
  }

  handleAreYouSure () {
    this.setState({ areYouSure: !this.state.areYouSure });
    this.toggleAreYouSure();
  }

  toggleJoinRsvp() {
  if (this.props.loggedIn) {
    if (Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`)) {
      return <button onClick={this.handleAreYouSure} className="join-group-button">Leave Group</button>;
    } else {
      return <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>;
      }
    }  else {
      return <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>;
    }
  }

  goToEditGroup (id) {
    return () => { hashHistory.push(`/groups/${id}/edit`) };
  }

  render () {
    if (!this.props.group || !this.props.group.users) {
      return (<div className='group-index-box'><img className='loading-spinner-group-show' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/></div>);
    } else {
      const forms = {
        'login': <LogInForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("signup")} />,
        'signup': <SignUpForm closeModal={this.closeModal} handleModalOpen={this.handleModalOpen("login")} />,
        'createEvent': <CreateEventForm closeModal={this.closeModal} />,
        'founderProfile': <FounderProfile closeModal={this.closeModal} profileId={ this.props.loggedIn ? this.props.currentUser.id : 9823 }/>,
        'groupMap': <GroupMap latitude={this.props.group.latitude} longitude={this.props.group.longitude} closeModal={this.closeModal}/> }

      const { name, id, photo_url, location, users, category,
              founded, event_count, member_count } = this.props.group;

      return (
        <div className='width-setter'>
        <div className='group-show-page'>
          <div className='group-name-nav'>
            <h1 className='group-name'>{name}</h1>
            <div className='group-header-buttons'>
              <div className='left-side-buttons'>
                <Link className='home-button' to={`/groups/${id}`}>Home</Link>
                <button className='group-show-buttons founder-modal-button' onClick={this.handleModalOpen('founderProfile')}>Founder</button>
                { this.props.loggedIn && Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`) && <button className='create-event-button' onClick={this.handleModalOpen('createEvent')}>Create Events</button> }
                { this.props.loggedIn && Object.keys(this.props.group.users).includes(`${this.props.currentUser.id}`) && <button className='group-show-buttons edit-group-button' onClick={this.goToEditGroup(id)}>Edit Group</button> }
              </div>
              {this.toggleJoinRsvp()}
                <div  style={this.toggleAreYouSure()} className='sure-form-box animated fadeInUp' >
                  <div className='sure-arrow-up-pos'>
                    <div className='sure-buttons-box'>
                      <button className='sure-buttons' onClick={this.handleLeaveGroup}>Yes</button>
                      <button className='sure-buttons' onClick={this.handleAreYouSure}>No</button>
                    </div>
                    <div className='are-you-sure-text'>Are you sure?</div>
                    <div className='sure-arrow-up'></div>
                  </div>
                </div>
            </div>
          </div>

          <div className='content-container'>
            <ul className='group-side-bar-info'>
              <img className='group-side-bar-pic' src={photo_url} />

              <section className='side-bar-text-box'>
                <div className='text-info-inner-box'>
                  <div className='side-bar-location'>{location}</div>
                  <li className='side-founded'>Founded: {founded.slice(0, 10)}</li>
                  <button  className='side-aboutus' onClick={this.handleModalOpen('groupMap')}>Find us...</button>


                    <li className='side-bar-passion'>
                      <div>We are passionate about:</div>
                      <div className='about-passion'>{category}</div>
                    </li>

                    <li className='side-bar-info'>
                      <div>Events</div>
                      <div>{event_count}</div>
                    </li>

                    <li className='side-bar-info'>
                      <div>Members</div>
                      <div>{member_count}</div>
                    </li>



                    <div className='group-members-list'>
                      <ul className='group-members'>
                      {
                        Object.keys(users).map(idx => (
                          <div className='member-and-pic-box' key={idx}>
                            <div className='pro-pic-box'>
                              <Link to={`/profile/${idx}`}><img className='pro-pic' src={users[idx].image_url} /></Link>
                            </div>

                            <Link to={`/profile/${idx}`}>
                              <div className='member-name'>{users[idx].name}</div>
                            </Link>
                          </div>
                        ))}
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
                                            <h1 className="group-show-description-title">Welcome!</h1>
                                            <p className="group-show-description-detail">{this.props.group.description}</p>

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
            className={`modal-container modal-${this.state.modalType} animated  animated zoomIn`}
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            contentLabel="header-modals">
            {forms[this.state.modalType]}
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
    loading: state.loading.loading
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
