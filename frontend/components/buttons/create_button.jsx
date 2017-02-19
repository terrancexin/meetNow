import React from 'react';
import { connect } from 'react-redux';
import { receiveModal } from '../../actions/modal_actions';

const CreateButton = ({ showCreateForm }) => {
  const handleClick = (event) => {
    event.preventDefault();
    showCreateForm();
  }

  return (
    <button className='create-button' onClick={ handleClick }>Start a MeetNow!</button>
  )
};

const mapDispatchToProps = dispatch => ({
  showCreateForm: () => dispatch(receiveModal('create-form'))
})

export default connect(
  null,
  mapDispatchToProps
)(CreateButton);
