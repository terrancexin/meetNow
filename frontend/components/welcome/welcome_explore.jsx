import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';

class WelcomeExplore extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h3 className='welcome-explore-header'>Explore</h3>
        <div className='welcome-explore-below-header'>
          <section className='explore-first-section'>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/fitness' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/fitness.png" />
              </Link><p>Fitness</p>
            </label>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/music' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/music.png" />
              </Link><p>Music</p>
            </label>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/culture' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/culture.png" />
              </Link><p>Culture</p>
            </label>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/tech' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/tech.png" />
              </Link><p>Tech</p>
            </label>

          </section>

          <section className='explore-second-section'>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/art' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/art.png" />
              </Link><p>Art</p>
            </label>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/dance' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/dance.png" />
              </Link><p>Dance</p>
            </label>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/health' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/health.png" />
              </Link><p>Health</p>
            </label>

            <label className='explore-pic-wrapper'>
              <Link to='/explore/game' className='explore-pic-links'>
                <img className='explore-pics' src="https://s3.amazonaws.com/meetnow-DEV/category/game.png" />
              </Link><p>Game</p>
            </label>

          </section>
        </div>
      </div>

    );

  }
}

// export default WelcomeExplore;

const mapStatetoProps = state => ({
  filterName: state.groups
});

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: (filter) => dispatch(fetchAllGroups(filter))
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(WelcomeExplore);
