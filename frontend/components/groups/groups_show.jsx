import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGroup, updateGroup } from '../../actions/group_actions';
import { addUserToGroup } from '../../actions/member_actions';
import Modal from 'react-modal';
import modalStyle from '../welcome/modalStyle';
import GroupsForm from './groups_form';
import WelcomeHeader from '../welcome/welcome_header';
import WelcomeFooter from '../welcome/welcome_footer';

class GroupsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, joinGroup: false };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleJoinGroup = this.handleJoinGroup.bind(this);
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
      console.log("must log in first");
    }

  }

  render () {
    // debugger
    if (this.props.group) {

      return (
        <div>
          <WelcomeHeader />

          {
            !this.state.joinGroup && <button onClick={this.handleJoinGroup} className="join-group-button">Join us!</button>
        }

        {
          this.state.joinGroup && <button onClick={this.handleJoinGroup} className="join-group-button">Leave Group</button>
      }

      {
        this.props.group.users && <label>We have {Object.keys(this.props.group.users).length} members!</label>
    }


    <h1 className='group-banner'>{this.props.group.name}</h1>
    <ul className='group-side-bar-info'>
      <li>{this.props.group.description}</li>
      <li>{this.props.group.location}</li>
    </ul>

    <section>Events</section>
    <div>Right side bar</div>

    <WelcomeFooter />

    <Modal
      isOpen={this.state.modalOpen}
      onRequestClose={this.closeModal}
      style={modalStyle}
      contentLabel='create-group-form'>
    </Modal>
  </div>
);
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
    group: state.groups[ownProps.params.groupId]
  });
};

const mapDispatchToProps = dispatch => {
  return (
    {
      fetchSingleGroup: (id) => dispatch(fetchSingleGroup(id)),
      addUserToGroup: (userId, groupId) => dispatch(addUserToGroup(userId, groupId))
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsShow);
