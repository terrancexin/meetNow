import React from 'react';
import HeaderContainer from './home/header_container';
import FooterContainer from './home/footer_container';
import AuthFormModal from './authform/auth_form_modal';

const App = ({ children }) => (
  <div className='app-container'>
    { children }

  </div>
);

export default App;
