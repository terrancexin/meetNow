import React from 'react';
import { createGroup } from '../../actions/group_actions';
import { connect } from 'react-redux';
// import { Router } from 'react-router';

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      category: '',
      name: '',
      description: ''
    };

    this.handleLocation = this.handleLocation.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup(this.state);
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
      <div className='create-group-form-container'>
        <form className='create-group-from' onSubmit={this.handleSubmit}>
            <h1>Wanna MeetNow? Start it!</h1>
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
            <input
              type='submit' value="Let's MeetNow!"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  group: state.groups.selectedGroup
});

const mapDispatchToProps = dispatch => ({
  createGroup: group => dispatch(createGroup(group))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupForm);
