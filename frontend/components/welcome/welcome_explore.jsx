import React from 'react';
import { Link } from 'react-router';

const WelcomeExplore = () => (
  <div>
    <h3 className='welcome-explore-header'>Explore</h3>
      <section className='explore-first-section'>

        <label className='explore-pic-wrapper'>
          <Link to='/fitness' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.fitnessImage} />
          </Link><p>Fitness</p>
        </label>

        <label className='explore-pic-wrapper'>
          <Link to='/music' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.musicImage} />
          </Link><p>Music</p>
        </label>

        <label className='explore-pic-wrapper'>
          <Link to='/culture' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.cultureImage} />
          </Link><p>Culture</p>
        </label>

        <label className='explore-pic-wrapper'>
          <Link to='/tech' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.techImage} />
          </Link><p>Tech</p>
        </label>

      </section>

      <section className='explore-second-row'>

        <label className='explore-pic-wrapper'>
          <Link to='/art' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.artImage} />
          </Link><p>Art</p>
        </label>

        <label className='explore-pic-wrapper'>
          <Link to='/dance' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.danceImage} />
          </Link><p>Dance</p>
        </label>

        <label className='explore-pic-wrapper'>
          <Link to='/health' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.healthImage} />
          </Link><p>Health</p>
        </label>

        <label className='explore-pic-wrapper'>
          <Link to='/game' className='explore-pic-links'>
            <img className='explore-pics' src={window.assets.gameImage} />
          </Link><p>Game</p>
        </label>

      </section>
  </div>
);

export default WelcomeExplore;
