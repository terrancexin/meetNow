import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class FormModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <form onSubmit={this.handleSubmit}>
					MeetNow!
					<br/>
					Please {this.props.formType} or {this.navLink()}
					{this.renderErrors()}
					<div>
						<br/>
						<label> Username:
							<input type="text"
								value={this.state.username}
								onChange={this.update("username")}
								/>
						</label>
						<br/>
						<label> Password:
							<input type="password"
								value={this.state.password}
								onChange={this.update("password")}
							  />
						</label>
						<br/>
						<input type="submit" value="Submit" />
						<input onClick={this.demo} type="submit" value='Guest Login' />
					</div>
				</form>

        </Modal>
      </div>
    );
  }
}

export default FormModal;
