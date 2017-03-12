import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { groupsArray } from '../../reducers/group_reducer';
import { Link } from 'react-router';
import SearchBar from '../search/search_form';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentDidMount() {
    const category = this.handleCategory(this.props.category);
    this.props.fetchAllGroups(category.searchFilter);
  }

  handleCategory(name) {
    const category = { headerName: '', searchFilter: '' };
    switch(name){
      case "fitness":
        return {headerName: "Sports & Fitness Groups", searchFilter: 'workout'};
      case "music":
        return {headerName: "Music ♫ Groups", searchFilter: 'karaoke'};
      case "health":
        return {headerName: "Health & Wellness Groups", searchFilter: 'meditation'};
      case "culture":
        return {headerName: "Language & Culture Groups", searchFilter: 'trilingual'};
      case "art":
        return {headerName: "Creative Groups", searchFilter: 'painting class'};
      case "tech":
        return {headerName: "Everything Technology", searchFilter: 'tech'};
      case "dance":
        return {headerName: "Let's Dance!", searchFilter: 'salsa'};
      case "game":
        return {headerName: "Games Groups", searchFilter: 'settlers of catan'};
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

        <div className='search-group-index-box'>
        <SearchBar category={category.searchFilter}/>

          <ul className='group-index-wrapper'>
            {
              this.props.groups.map(group => {
              if (group.member_count !== 0) {
                return (
                  <li className='group-pics' key={group.id}>
                    <GroupsIndexItems
                      groupPhoto={group.about}
                      groupId={group.id}
                      name={group.name}
                      members={group.member_count}/>
                  </li>
                  );
                }
              })
            }
          </ul>
          </div>
      </div>
    );
  }
}

const GroupsIndexItems = ({ groupPhoto, groupId, name, members }) => {
  return (
    <Link to={`/groups/${groupId}`} className='group-links'>
        <img src={groupPhoto} alt="groups"/>
        <h4 className='group-name'>{name}</h4>
        <p className='member-count'>We're {members} Members</p>

    </Link>
  );
};

const mapStateToProps = (state, ownProps) => {
  return ({
    category: ownProps.params.category,
    groups: groupsArray(state.groups)
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAllGroups: (filter) => dispatch(fetchAllGroups(filter))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorePage);
