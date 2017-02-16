import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router';

const HomePage = () => (
  <div>
    <div className="video-wrapper">
      <video autoPlay muted loop>
        <source src="" type="video/mp4"/>
      </video>
    </div>
  </div>
);

export default HomePage;
