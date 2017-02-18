import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGroup } from '../../actions/group_actions';
import Modal from 'react-modal';
import CreateGroupForm from './group_form';
import modalStyle from '../welcome/modalStyle';

class GroupShow extends React.Component {
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
        <h1>{this.props.group.name}</h1>
        <h2>{this.props.group.description}</h2>
        <button className='create-group-form-button' onClick={this.openModal}>Create Group</button>

      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}
        style={modalStyle}
        contentLabel='create-group-form'>
        <CreateGroupForm />
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
      fetchSingleGroup: (id) => dispatch(fetchSingleGroup(id))
    }
  );

};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupShow);
