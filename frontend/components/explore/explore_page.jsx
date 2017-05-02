import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { fetchAllEvents } from '../../actions/event_actions';
import { groupsArray } from '../../reducers/group_reducer';
import { Link } from 'react-router';
import SearchBar from '../search/search_form';
import EventCalendar from '../search/calendar';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { calendar: false };
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  toggleCalendar(bool) {
    this.setState({ calendar: bool });
  }

  componentDidMount() {
    const category = this.handleCategory(this.props.category);
    this.props.fetchAllGroups(category.searchFilter);
    this.props.fetchAllEvents();
  }

  handleCategory(name) {
    const category = { headerName: '', searchFilter: '' };
    switch(name){
      case "fitness":
        return {headerName: "Sports & Fitness Groups", searchFilter: 'soccer'};
      case "music":
        return {headerName: "Music ♫ Groups", searchFilter: 'karaoke'};
      case "health":
        return {headerName: "Health & Wellness Groups", searchFilter: 'meditation'};
      case "culture":
        return {headerName: "Language & Culture Groups", searchFilter: 'cultural'};
      case "art":
        return {headerName: "Creative Groups", searchFilter: 'draw'};
      case "tech":
        return {headerName: "Everything Technology", searchFilter: 'tech'};
      case "dance":
        return {headerName: "Let's Dance!", searchFilter: 'dance'};
      case "game":
        return {headerName: "Games Groups", searchFilter: 'game'};
    }
  }

  render () {
    const sumGroup = this.props.groups.length;
    const category = this.handleCategory(this.props.category);
      return (
        <div className='group-index-box'>
          <div className='group-banner'>
            <h1>{category.headerName}</h1>
            <div className='sum-group'>{sumGroup} interesting groups nearby. Go MeetNow!</div>
          </div>

          <SearchBar category={category.searchFilter} toggleCalendar={this.toggleCalendar} />

          { !this.state.calendar &&
            <ul className='group-index-wrapper'>
              {
                this.props.groups.map(group => {
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
          { this.state.calendar && <EventCalendar events={this.props.events}/> }
        </div>
      );
  }
}

const GroupsIndexItems = ({ groupPhoto, groupId, name, members }) => {
  return (
    <Link className='group-links' to={`/groups/${groupId}`} >
        <img className='group-img' src={groupPhoto} alt="groups"/>
        <h4 className='group-index-name'>{name}</h4>
        <p className='member-count'>We're {members} Members</p>

    </Link>
  );
};

const mapStateToProps = (state, ownProps) => {
  return ({
    category: ownProps.params.category,
    groups: groupsArray(state.groups),
    events: state.events
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAllGroups: (filter) => dispatch(fetchAllGroups(filter)),
  fetchAllEvents: () => dispatch(fetchAllEvents())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorePage);
