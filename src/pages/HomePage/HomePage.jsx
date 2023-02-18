import React from 'react';
import style from './HomePage.module.css'
import useUserStore from '../../database/store';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const setToken = useUserStore(state => state.setToken)
  const navigate = useNavigate()
  const logout = () => {
    setToken(null)
  }

  return (
    <div className={style['home-page']}>
      <h1>Home Page</h1>
      <button type="submit" className='btn btn-primary' onClick={logout}>Logout</button>
      <button type="submit" className='btn btn-primary' onClick={() => navigate('/forget')}>Change Password</button>
    </div>
  )
}

export default HomePage;