import React from 'react';
import { createGroup } from '../../actions/group_actions';
import { connect } from 'react-redux';
import { Router, withRouter } from 'react-router';
import { clearGroupErrors } from '../../actions/group_actions';
import Errors from '../errors/errors';


class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {name: '', location: '', description: '', category: ''};

    this.handleLocation = this.handleLocation.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  componentWillMount() {
    this.props.clearGroupErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup(this.state)
      .then((result) => {
        this.props.closeModal();
        this.props.router.push(`groups/${result.group.id}`);
      });
  }

  handleLocation(e) {
    this.setState({location: e.target.value});
  }

  handleCategory(e) {
    this.setState({category: e.target.value});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  handleDescription(e) {
    this.setState({description: e.target.value});
  }

  render() {
    return (
      <div className='modal-form-container'>
        <div className='form-header'>
          <h1 className='group-form-header'>Start a new group!</h1>
        </div>
        <Errors errors={ this.props.errors } />

        <form className='create-group-form' onSubmit={this.handleSubmit}>
          <div className='group-form-inputs-box'>
            <label>Name</label>
            <input type='text' value={this.state.name} onChange={this.handleName} placeholder='Startup Grind NYC'/>

            <label>Category</label>
            <input type='text' value={this.state.category} onChange={this.handleCategory} placeholder='tech'/>

            <label>Description</label>
            <input type='text' value={this.state.description} onChange={this.handleDescription} placeholder='Your awesome group'/>

            <label>Location</label>
            <input type='text' value={this.state.location} onChange={this.handleLocation} placeholder='New York'/>

            <input type='submit' value="Create"/>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.group
});

const mapDispatchToProps = (dispatch) => ({
  createGroup: group => dispatch(createGroup(group)),
  clearGroupErrors: () => dispatch(clearGroupErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGroupForm));
