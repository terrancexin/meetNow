import React from 'react';
import { Link } from 'react-router';

const WelcomeExplore = (props) => (
  <div>
    <h3 className='welcome-explore-header'>Explore</h3>
    <section className='explore-first-row'>
      <label>
        <Link to='/explore/fitness' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.fitnessImage} />
        </Link><span>Fitness</span>
      </label>
      <label>
        <Link to='/explore/music' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.musicImage} />
        </Link><span>Music</span>
      </label>
      <label>
        <Link to='/explore/food' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.foodImage} />
        </Link><span>Food</span>
      </label>
      <label>
        <Link to='/explore/tech' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.techImage} />
        </Link><span>Tech</span>
      </label>
      <label>
        <Link to='/explore/art' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.artImage} />
        </Link><span>Art</span>
      </label>
      <label>
        <Link to='/explore/dance' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.danceImage} />
        </Link><span>Dance</span>
      </label>
      <label>
        <Link to='/explore/health' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.healthImage} />
        </Link><span>Health</span>
      </label>
      <label>
        <Link to='/explore/business' className='explore-pic-links'>
          <img className='explore-pics' src={window.assets.businessImage} />
        </Link><span>Business</span>
      </label>
    </section>
  </div>
);

export default WelcomeExplore;
