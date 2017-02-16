import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class WelcomeGroups extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      category: ""
    };
  }

  componentDidMount(){
    const category = this.props.routeParams.category.split("_").join(" ").replace("&", "_");
    this.props.fetchCategoryGroups(category);
    this.setState({ category: this.props.routeParams.category.split("_").join(" ")});
  }

  render() {

    let welcomeGroupName = "welcome-group ";
    const categoryName = this.props.routeParams.category;
    switch(categoryName){
      case "fitness":
        welcomeGroupName = welcomeGroupName + "fitness";
        break;
      case "music":
        welcomeGroupName = welcomeGroupName + "music";
        break;
      case "food":
        welcomeGroupName = welcomeGroupName + "food";
        break;
      case "tech":
        welcomeGroupName = welcomeGroupName + "tech";
        break;
      case "art":
        welcomeGroupName = welcomeGroupName + "art";
        break;
      case "dance":
        welcomeGroupName= welcomeGroupName + "dance";
        break;
      case "health":
        welcomeGroupName = welcomeGroupName + "health";
        break;
      case "business":
        welcomeGroupName = welcomeGroupName + "business";
        break;
    }

    let exploreList;
    if(this.props.categoryGroups.length > 0){
      exploreList = this.props.categoryGroups.map((group) => (
        <Link to='/signup'><li key={group.id}><h1>{group.name}</h1>{createParagraphs(group.description)}</li></Link>
      ));
    }


    return (
      <section className={welcomeGroupName}>
          <h1 className='explore-page-header'>Welcome To MeetNow! Check out these groups!<br/><div className='explore-header-category'>{this.state.category}</div></h1>
        <section className='explore-page-container'>
          <ul className='explore-page-list'>
            {exploreList}
          </ul>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryGroups: state.groups.categoryGroups
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryGroups: (category) => dispatch(fetchCategoryGroups(category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeGroups);
