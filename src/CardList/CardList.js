import React, { createElement, useMemo } from 'react';
import { List, Tag, Rate, Image, Typography, Button } from 'antd';
import { useData, getData, serverHost, postData } from '../data';
import CustomeP from "../util/customeP";
import "../CardList/CardList.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
const { Title, Paragraph} = Typography

function CardList() {
  const context = useData()
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const defaultGraph = {nodes:[{id:"1"},{id:"2"}],links:[{source:"1",target:"2"}]}

  function toArray(lists) {
    let keys = Object.getOwnPropertyNames(lists)
    let res = []
    for (let index = 0; index < keys.length; index++) {
      res.push(lists[keys[index]])
    }
    return res;
  }

  let openGraph=(item,layer)=>{
    context.setGraph(defaultGraph)
    let url = serverHost + `Graph?bookid=${item.book_id}&neighbor=${layer}`;
    getData(url,console.log)
    .then((res)=>{
      if(res==404){
        context.setGraph(defaultGraph);
      }else{
        context.setGraph(res);
      }
    })
    .catch(err=>context.setGraph(defaultGraph));
  }


  let randomTag = (item) => {
    let colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    let tags = item.popular_shelves ? item.popular_shelves : [];
    let childs = ["Keyword: "];
    if (tags.length == 0) {
      return <div>No one know this ?</div>
    } else if (tags.length >= 5) {
      for (let i = 0; i < 5; i++) {
        childs.push(<Tag key={i} color={colors[Math.floor(Math.random() * colors.length)]}>{tags[i].name}</Tag>)
      }
    } else {
      for (let i = 0; i < tags.length; i++) {
        childs.push(<Tag key={i} color={colors[Math.floor(Math.random() * colors.length)]}>{tags[i].name}</Tag>)
      }
    }
    let res = createElement("div", null, childs);
    return res;
  }

  let selectBook = (item) =>{
    // context.setComments(item.comments);
    context.setCommentShow(true);
  }

  let sendScore = (score, book_id) =>{
    if(context.user){
      let url = serverHost + `sendscore`;
      let rating = {uid:context.user, bookid:book_id, score:score};
      console.log(score);
      postData(url,rating);
    }
  }
  
  let description = (item,index) => {
    return <div key={index}>
      <div style={{ display: 'flex', flexFlow: 'row' }}>
        <div id="item_image" style={{ width: "15%" ,textAlign:'center', marginTop:"5%"}}>
          <Image
            style={{height:'100%'}}
            src={item.image_url ? item.image_url : 'error'}
            fallback='https://miro.medium.com/max/1400/1*qdFdhbR00beEaIKDI_WDCw.gif'
          />
        </div>
        <div id="item_information" style={{ width: "80%", marginLeft:'10px'}}>
          <Title id="book_title" level={4} onClick={(item)=> selectBook(item)}>{item.title}</Title>
          <Rate defaultValue={item.average_rating} onChange={(value)=>sendScore(value, item.book_id)} allowHalf></Rate>
          <div>by: {item.author_list}</div>
          <div>country: {item.country_code}</div>
          <div>language: {item.language_code}</div>
          <div>link: <a href={item.url}>{item.url}</a></div>
          {randomTag(item)}
          <div key={index}><CustomeP description={item.description}/></div>
          <Button onClick={(item)=>openGraph(item,3)}>Force Graph</Button>
        </div>
      </div>
    </div>
  }
  let getPageInfo = (page, pageSize) => {
    let result_from = (page * pageSize) - pageSize;
    let result_to = (page * pageSize) - 1;
    let url = serverHost + `/search?uid=${params.get("uid")}&query_type=${params.get("query_type")}&query=${params.get("query")}&result_range_from=${result_from}&result_range_to=${result_to}&score=${0}/`;
    navigate(`/search?uid=${params.get("uid")}&query_type=${params.get("query_type")}&query=${params.get("query")}&result_range_from=${result_from}&result_range_to=${result_to}&score=${0}/`);
    getData(url, context.setLoading)
    .then((books) => context.setResult(toArray(books.result_list)))
    .catch(err => { console.log(err) })
    .then(() => context.setLoading(false));
  }

  const pagination = {
    position: 'bottom',
    align: 'center',
    pageSize: 10,
    size: 'default',
    total: context.num_res,
    onChange: (page, pageSize) => { getPageInfo(page, pageSize) },
    showSizeChanger: false
  }
  return useMemo(() => {
    return <List
      id='CardList'
      pagination={pagination}
      align='left'
      split={true}
      loading={context.loading}
      size='small'
      dataSource={context.result}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            description={description(item,index)}
          />
        </List.Item>
      )}
    />
  }, [context.loading, context.result, context.display])
}

export default CardList