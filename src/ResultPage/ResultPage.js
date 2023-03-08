import React, {useEffect, useState } from 'react';
import {useNavigate, useLocation, useParams } from 'react-router-dom';
import {Layout, Slider } from 'antd';
import QueueAnim from 'rc-queue-anim';
import '../ResultPage/ResultPage.css';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import BookDetail from '../BookDetail/BookDetail';
import {FrownOutlined,SmileOutlined} from '@ant-design/icons';
import { getData } from '../data';

const { Header, Content } = Layout

function ResultPage(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [score, setScore] = useState(0);
  const cLocation = useLocation();
  const queryObject = useParams();
  const mid = 2;
  // const handleBack = (event) => {
  //   event.stopPropagation();
  //   setShow(!show);

  // }

  useEffect(()=>{
    console.log("FirstRender")
    console.log(queryObject)
    console.log(cLocation)
  },[])


  const getBookAtScore = (score) =>{
    // getData(url, context.setLoading).then((books) => { setResult(toArray(books.result_list)); context.setNum_res(books.result_num); context.setApi(url2) })
    // .catch(err => { context.setLoading(false); setResult([]) });
  }

  return (
    <QueueAnim

      className='full_page'
      type={['left', 'right']}
      duration={200}
      // onEnd={handleEnd}
    >
      {show ? [
        <Layout
          id='result_page'
          className="full_page"
          key="layout"

        >
          <Header style={{ position: 'sticky',width:'100%', height: "20%", backgroundColor: "#ffffff", boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.12)", zIndex: 1 }}>
            <div style={{ height: "100%", width: "50%", transform:'translate(14%)' }}>
              <SearchBar show={show} setShow={setShow} identity="ResultPage" />
              <div style={{ height: "20%", width: "100%", display: "flex" ,alignItems:'center',flexDirection:"row"}}>
                  <FrownOutlined className={score <= mid && 'icon_selected'}/>
                  <Slider onChange={(value)=>setScore(value)} style={{ width: "80%" , marginLeft:"10px", marginRight:"10px"}} min={0} max={5}></Slider>
                  <SmileOutlined className={score > mid && 'icon_selected'} style={{marginRight:'10px'}}/>
                  <a style={{width:"48%",textAlign:'end'}}>
                    show books exceed the score
                  </a>
              </div>
            </div>
          </Header>
          <Content>
            <div id="list_area">
              <CardList />
            </div>
          </Content>
        </Layout>
      ] : null}
    </QueueAnim>
  )
}

export default ResultPage