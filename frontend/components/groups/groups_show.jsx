import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGroup, updateGroup } from '../../actions/group_actions';
import Modal from 'react-modal';
import modalStyle from '../welcome/modalStyle';
import GroupsForm from './groups_form';
import GroupsHeader from './groups_header';
import EventShow from '../events/events_show.jsx';

class GroupsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleGroup(this.props.params.groupId);
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  render () {
    // debugger
    return (
      <div>
        <GroupsHeader />
        <h1 className='group-name'>{this.props.group.name}</h1>
        <ul className='group-side-bar-info'>
          <li>{this.props.group.description}</li>
          <li>{this.props.group.location}</li>
        </ul>

      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={modalStyle}
        contentLabel='create-group-form'>
      </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return ({
    group: state.groups.selectedGroup,
  });
};

const mapDispatchToProps = dispatch => {
  return (
    {
      fetchSingleGroup: (id) => dispatch(fetchSingleGroup(id)),
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsShow);
