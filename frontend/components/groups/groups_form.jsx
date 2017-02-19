import React from 'react';
import { createGroup, fetchSingleGroup } from '../../actions/group_actions';
import { connect } from 'react-redux';
import { Router, withRouter } from 'react-router';

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = this.props.group;

    this.handleLocation = this.handleLocation.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.params) {
  //     this.props.fetchSingleGroup(this.props.params.groupId);
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   this.setState(newProps.group);
  // }

  // update(field) {
  //   return (e) => {
  //     this.setState({[field]: e.target.value});
  //   };
  // }


  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.action(this.state);
  // }
  //
  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup(this.state)
      .then(() => this.props.router.push('/groups'));
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
    // const text = this.props.formType === "new" ? "Create" : "Update";

    return (
      <div className='create-group-form-container'>
        <h1>Group Form</h1>
        <form className='create-group-from' onSubmit={this.handleSubmit}>
              <label>Name</label>
              <input
                type='text'
                value={this.state.name}
                onChange={this.handleName}
                />
            <label>Category</label>
            <input
              type='text'
              value={this.state.category}
              onChange={this.handleCategory}
              />
            <label>Description</label>
            <input
              type='text'
              value={this.state.description}
              onChange={this.handleDescription}
              />

            <label>Location</label>
              <input
                type='text'
                value={this.state.location}
                onChange={this.handleLocation}
                />

            <input
              type='submit' value="create group"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  group: state.groups.selectedGroup
});


const mapDispatchToProps = (dispatch) => ({
  fetchSingleGroup: id => dispatch(fetchSingleGroup(id)),
  createGroup: group => dispatch(createGroup(group))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGroupForm));
