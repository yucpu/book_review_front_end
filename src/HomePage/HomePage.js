import React,{useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import QueueAnim from 'rc-queue-anim';
import "../HomePage/HomePage.css";
import SearchBar from '../SearchBar/SearchBar';
import { DataContext, useData } from '../data';



export default function HomePage(props) {
  const context = useData()
  const [show,setShow] = useState(true);
  const navigate = useNavigate();




  const handleEnd = (object) =>{
    if (object.type == 'leave'){
      navigate(`/result/${context.method}/{query_id}/{session_id}/`);
    }
  }


  return (
    <QueueAnim
      className='full_page'
      type={['left','right']}
      onEnd = {handleEnd}
    >
      {show ? 
    <div key = 'a' className='full_page'>
      <div id='HomePage'>
        <img src={require('../resources/logo.png')} style={{maxWidth:'50%'}} />
          <SearchBar show={show} setShow={setShow} identity="HomePage"/>
      </div>
    </div>
    : null}
    </QueueAnim>
  )
}
