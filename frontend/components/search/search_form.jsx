import React from 'react';
import { fetchAllGroups } from '../../actions/group_actions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: ''};
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    // this.setState({[field]: event.currentTarget.value});
    this.setState({location: e.currentTarget.value});
    this.props.fetchAllGroups(e.currentTarget.value);
  }


  render() {
    return(
      <div>

      <input
      type='text'
      placeholder='All groups'
      value={this.state.location}
      onChange={this.updateSearch} />
  </div>
);
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: (filter) => dispatch(fetchAllGroups(filter))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
