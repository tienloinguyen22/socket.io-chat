import React from 'react';
import logo from '../static/logo.svg';
import './Loading.css'

export const Loading = (): JSX.Element => {
  return (
    <div className='loading'>
      <img src={logo} className="loading-img" alt="logo" />
    </div>
  );
};