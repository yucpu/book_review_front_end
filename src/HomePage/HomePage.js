import React, { useEffect, useState} from 'react';
import UserLogin from '../util/userLogin';
import QueueAnim from 'rc-queue-anim';
import "../HomePage/HomePage.css";
import SearchBar from '../SearchBar/SearchBar';
import { useData } from '../data';
import { useSearchParams } from 'react-router-dom';




export default function HomePage(props) {
  const [show, setShow] = useState(true);

  return (
    <QueueAnim
      className='full_page'
      type={['left', 'right']}
    
    >
      {show ?
        <div key='a' className='full_page'>
          <div id='HomePage'>
            <img src={require('../resources/logo.png')} style={{ maxWidth: '50%' }} />
            <SearchBar show={show} setShow={setShow} identity="HomePage" />
          </div>
          <UserLogin/>
        </div>
        : null}
    </QueueAnim>
  )
}
