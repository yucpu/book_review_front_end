import React, {useState} from 'react';
import { Link, useNavigate,useLocation} from 'react-router-dom';
import { Button, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
import '../ResultPage/ResultPage.css';
import SearchBar from '../SearchBar/SearchBar';
import { useData } from '../data';



function ResultPage() {
  const context = useData();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const cLocation = useLocation();


  const handleBack = (event)=>{
    event.stopPropagation();
    setShow(!show);
   
  }
  const handleEnd = (object)=>{
    if (object.type == "leave"){
      navigate('/');
      console.log(cLocation)
    }
  }

  return (
    <QueueAnim 
      className='full_page'
      type={['left','right']}
      duration={200}
      onEnd={handleEnd}
      >
        {show ? [
          <div 
            key="0" 
            style={{backdropFilter:'blur(3px)'}}
            className="full_page"
            onClick={handleBack}>    
              <div 
                id='result_page' 
                onClick={e=>e.stopPropagation()}
                >
                <div id="search_area">
                  <SearchBar show={show} setShow={setShow} identity="ResultPage"/>
                </div>
                <div id="result_area">
                  <div id='result_list'>
                    {context.result}
                  
                  </div>

                  <div id='overview'>
                    overview
                  </div>
                </div>
              </div>
          </div>
        ] : null}
    </QueueAnim>
  )
}

export default ResultPage