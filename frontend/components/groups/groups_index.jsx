import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { fetchAllEvents } from '../../actions/event_actions';
import { groupsArray } from '../../reducers/group_reducer';
import { Link } from 'react-router';
import SearchBar from '../search/search_form';
import EventCalendar from '../search/calendar';

class GroupsIndex extends React.Component {
  constructor() {
    super();
    this.state = { calendar: false };
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllGroups();
    this.props.fetchAllEvents();
  }

  toggleCalendar(bool) {
    this.setState({ calendar: bool });
  }

  render () {
    if (this.props.loading) {
      return (<div className='group-index-box'><img className='loading-spinner-group-index' src='https://s3.amazonaws.com/meetnow-DEV/meetNow/rolling.gif' alt='loading'/></div>);
    }

    const countAllGroups = this.props.groups.length
    return (
      <div className='group-index-box'>
        <div className='group-banner'>
          <h1>Find a Group</h1>
          <div className='sum-group'>{countAllGroups} interesting groups nearby. Go MeetNow!</div>
        </div>

        <SearchBar toggleCalendar={this.toggleCalendar}/>

        { !this.state.calendar &&
          <ul className='group-index-wrapper'>
            { this.props.groups.map(group => {
                if (group.member_count !== 0) {
                  return (
                    <li className='group-pics' key={group.id}>
                      <GroupsIndexItems
                        groupPhoto={group.photo_url}
                        groupId={group.id}
                        name={group.name}
                        members={group.member_count}/>
                    </li>
                  );
                }
              })
            }
          </ul>
        }

        { this.state.calendar &&
          <ul className='calendar-group-index-wrapper'>
            <EventCalendar events={this.props.events}/>
          </ul>
        }
      </div>
    );
  }
}

const GroupsIndexItems = ({ groupPhoto, groupId, name, members }) => {
  return (
    <Link className='group-links' to={`/groups/${groupId}`}>
        <img className='group-img' src={groupPhoto} alt="groups"/>
        <h4 className='group-name'>{name}</h4>
        <p className='member-count'>We're {members} Members</p>
    </Link>
  );
};

const mapStateToProps = state => ({
  groups: groupsArray(state.groups),
  events: state.events,
  loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: () => dispatch(fetchAllGroups()),
  fetchAllEvents: () => dispatch(fetchAllEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsIndex);
