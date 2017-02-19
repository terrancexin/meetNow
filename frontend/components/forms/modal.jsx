import React from 'react';
import { connect } from 'react-redux';
import { receiveModal } from '../../actions/modal_actions';
import LogInForm from './log_in_form';
import SignUpForm from './sign_up_form';
import CreateNewGroup from './create_new_group';

const modals = {
  signUp: <SignUpForm />,
  logIn: <LogInForm />,
  createNewGroup: <CreateNewGroup />
};

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    if (e.target.getAttribute('class') === 'modal-screen') {
      this.props.closeModal();
    }
  }

  render () {
    const { modal, closeModal } = this.props;
    if (!modal) { return null; }

    // const width = (this.props.modal === 'createGroup' ||
    //                this.props.modal === 'editTrack') ? 600 : 400

    return (
      <div onClick={ this.handleClick } className='modal-screen'>
        <i className="modal-close" onClick={ closeModal }></i>
        <div className='modal-content' style={ {width: width} }>
          { modals[modal] }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(receiveModal(''))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
