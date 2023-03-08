import React, {useEffect, useState} from 'react';
import { Link, useNavigate,useLocation} from 'react-router-dom';
import { Button, Input, Layout} from 'antd';
import QueueAnim from 'rc-queue-anim';
import '../ResultPage/ResultPage.css';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import BookDetail from '../BookDetail/BookDetail';


const {Header, Content} = Layout

function ResultPage() {
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
          <Layout 
            id='result_page'
            className="full_page"
            key="layout"
            >    
              <Header style={{position:'sticky', height:"20%"}}>
                <div style={{width:"50%", marginLeft:"20%"}}>
                <SearchBar show={show} setShow={setShow} identity="ResultPage" style={{width:"50%"}}/>
                </div>
              </Header>
              <Content>
                <div id="list_area">
                    <CardList/>
                </div>
              </Content>
          </Layout>
        ] : null}
    </QueueAnim>
  )
}

export default ResultPage