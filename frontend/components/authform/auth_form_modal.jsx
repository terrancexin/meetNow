import React from 'react';
import { Link, withRouter, hashHistory } from 'react-router';
import Modal from 'react-modal';

class AuthFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      modalOpen: this.props.modalOpen,
      Username: "",
      Password: ""
    };

    this.style = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(0, 0, 0, 0.1)',
        zIndex          : 10
      },
      content : {
        opacity         : 1,
        backgroundColor : '#fff',
        position        : 'fixed',
        top             : '20%',
        height          : '255px',
        width           : '600px',
        margin          : '0 auto',
        bottom          : '0',
        border          : '3px solid #aaa',
        padding         : '20px',
        zIndex          : 11
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalOpen: nextProps.modalOpen });
  }

  handleChange(type) {
    return (e) => {
      if (type === "Username") {
        this.setState({
          Username: e.currentTarget.value
        });
      } else {
        this.setState({
          Password: e.currentTarget.value
        });
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return(
      <div>
      <Modal isOpen={this.props.modalOpen}
        onRequestClose={this.props.closeModal}
        style={this.style}>

      </Modal>
      </div>
    );
  }
}

export default withRouter(AuthFormModal);
