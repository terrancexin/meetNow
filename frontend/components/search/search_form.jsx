import React from 'react';
import { fetchAllGroups } from '../../actions/group_actions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.category || '', selected: 'groups' };
    this.updateSearch = this.updateSearch.bind(this);
  }

  toggleSelected(selected) {
    return () => { this.setState({ selected }) };
  }

  updateSearch(e) {
    this.setState({name: e.currentTarget.value});
    this.props.fetchAllGroups(e.currentTarget.value);
  }

  render() {
    const groupsClass = this.state.selected === 'groups' ? 'groups-button' : 'calendar-button';
    const calendarClass = this.state.selected === 'calendar' ? 'groups-button' : 'calendar-button';

    return(
      <div className='search-bar'>
        <div className='search-bar-left'>
          <input className='search-input' type='text' placeholder='e.g. tech' value={this.state.name} onChange={this.updateSearch} />
          <i id='search-icon' className="fa fa-search fa-2x" aria-hidden="true"></i>
          <div className='within-miles'>within 25 miles by location</div>
        </div>

        <div className='search-bar-right'>
          <button onClick={this.toggleSelected('groups')} className={groupsClass}>Groups</button>
          <button onClick={this.toggleSelected('calendar')} className={calendarClass}>Calendar</button>
        </div>
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
