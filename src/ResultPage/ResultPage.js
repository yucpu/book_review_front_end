import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout, Slider, Typography} from 'antd';
import QueueAnim from 'rc-queue-anim';
import '../ResultPage/ResultPage.css';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { useData, getData, getChatGPT} from '../data';
import UserLogin from '../util/userLogin';
import Graph from '../GraphPage/Graph';
import Comments from '../BookDetail/Comments';
import GptPage from '../GptPage/GptPage';

const {Text} = Typography
const { Header, Content } = Layout
function ResultPage() {
  const context = useData();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [params,] = useSearchParams();
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
      
    }else{
      let parameter = {uid:uid, method:method,query:query,rangeFrom:rangeFrom,rangeTo:rangeTo,score:score};
      getData(parameter, context.setLoading)
      .then((books) => { context.setResult(toArray(books.result_list));context.setNum_res(books.result_num);context.setResponseTime(books.time);})
      .catch(err => { context.setLoading(false); context.setResult([]); })
      console.log("correct");
      getChatGPT(query, context.setChatLoading).then((res)=>{context.setGptSuggest(res.suggest);}).catch(err=>context.setChatLoading(false));
      context.setPage((rangeFrom / 10) + 1);
    }
  }, [])

  // let showBookByScore = (score) =>{
  //   let uid = params.get("uid");
  //   let method = params.get("query_type");
  //   let query = params.get("query");
  //   let rangeFrom = params.get("result_range_from");
  //   let rangeTo = params.get("result_range_to");
  //   let parameter = {uid:uid, method:method,query:query,rangeFrom:rangeFrom,rangeTo:rangeTo,score:score};
    
  //   getData(parameter, context.setLoading)
  //   .then((books) => { context.setResult(toArray(books.result_list));context.setNum_res(books.result_num); context.setResponseTime(books.time);})
  //   .catch(err => { context.setLoading(false); context.setResult([]); })
  //   navigate(`/search?uid=${uid}&query_type=${method}&query=${query}&result_range_from=${rangeFrom}&result_range_to=${rangeTo}&score=${score}`);
  //   context.setPage(1);
  // }

  

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
            <Header className='app_header' style={{backgroundColor:"#ffffff", height:'120px'}}>
              <div style={{ height: "100%", width: "45%", marginLeft:"calc(10%)"}}>
                <SearchBar show={show} setShow={setShow} identity="ResultPage" style={{width:"50%"}} />
                <div style={{ height: "20%", width: "100%", display: "flex", alignItems: 'center'}}>
                  <Text style={{ width: "20%", textAlign: 'center' }}>Score threshold: </Text>
                  <FrownOutlined className={context.score <= mid && 'icon_low_score'} />
                  <Slider reverse={false} value={context.score} onChange={(value) => context.setScore(value)} style={{ width: "80%", marginLeft: "10px", marginRight: "10px" }} min={0} max={5}></Slider>
                  <SmileOutlined className={context.score > mid && 'icon_high_score'} style={{ marginRight: '10px' }} />
                </div>
              </div>
              <UserLogin/>
            </Header>
            <Content style={{display:'flex'}}>
              <div id="list_area">
                <CardList />
              </div>
              <GptPage/>
              <Graph/>
              <Comments/>
            </Content>
          </Layout>
        ] : null}
      </QueueAnim>
    )
  }, [context.loading, context.user, context.score, context.chatLoading,context.gptSuggest, context.responseTime])

}


export default ResultPage