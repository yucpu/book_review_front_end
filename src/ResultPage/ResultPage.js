import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout, Slider } from 'antd';
import QueueAnim from 'rc-queue-anim';
import '../ResultPage/ResultPage.css';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { serverHost, useData, getData} from '../data';
import UserLogin from '../util/userLogin';
import Graph from '../GraphPage/Graph';
import Comments from '../BookDetail/Comments';


const { Header, Content } = Layout
function ResultPage(props) {
  const context = useData();
  const [show, setShow] = useState(true);
  const [score, setScore] = useState(0);
  const [params, setParams] = useSearchParams();
  const mid = 2;

  function toArray(lists) {
    let keys = Object.getOwnPropertyNames(lists)
    let res = []
    for (let index = 0; index < keys.length; index++) {
      res.push(lists[keys[index]])
    }
    return res;
  }

  useEffect(() => {
    let uid = params.get("uid");
  
    let method = params.get("query_type");
    let query = params.get("query");
    let rangeFrom = params.get("result_range_from");
    let rangeTo = params.get("result_range_to");
    let score = params.get("score") % 6;
    
    if (rangeFrom % 10 != 0 || rangeTo % 10 != 9){
      context.setResult([]);
      console.log("Wrong")
      
    }else{
      let url = serverHost + `search?uid=${uid}&query_type=${method}&query=${query}&result_range_from=${rangeFrom}&result_range_to=${rangeTo}&score=${score}`;
      getData(url, context.setLoading)
      .then((books) => { context.setResult(toArray(books.result_list));context.setNum_res(books.result_num)})
      .catch(err => { context.setLoading(false); context.setResult([]); })
      console.log("correct")
    }
  }, [])



  return useMemo(() => {
    return (
      <QueueAnim
        className='full_page'
        type={['left', 'right']}
        duration={200}
      >
        {show ? [
          <Layout
            id='result_page'
            className="full_page"
            key="layout"
          >
            <Header className='app_header' style={{backgroundColor:"#ffffff", height:'15%'}}>
              <div style={{ height: "100%", width: "50%", marginLeft:"10%"}}>
                <SearchBar show={show} setShow={setShow} identity="ResultPage" style={{width:"50%"}} />
                <div style={{ height: "20%", width: "100%", display: "flex", alignItems: 'center'}}>
                  <FrownOutlined className={score <= mid && 'icon_selected'} />
                  <Slider onChange={(value) => setScore(value)} style={{ width: "80%", marginLeft: "10px", marginRight: "10px" }} min={0} max={5}></Slider>
                  <SmileOutlined className={score > mid && 'icon_selected'} style={{ marginRight: '10px' }} />
                  <a style={{ width: "48%", textAlign: 'end' }}>
                    show books exceed the score
                  </a>
                </div>
              </div>
              <UserLogin/>
            </Header>
            <Content style={{display:'flex'}}>
              <div id="list_area">
                <CardList />
              </div>
              <Graph/>
              <Comments/>
            </Content>
          </Layout>
        ] : null}
      </QueueAnim>
    )
  }, [context.loading, context.user])

}

export default ResultPage