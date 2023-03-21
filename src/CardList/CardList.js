import React, { createElement, useMemo } from 'react';
import { List, Tag, Rate, Image, Typography, Button, Tooltip } from 'antd';
import { useData, getData, serverHost, postData, getGraph } from '../data';
import CustomeP from "../util/customeP";
import "../CardList/CardList.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '@ant-design/icons';

const { Title, Text} = Typography;

const GraphIcon = () => (
  <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>network</title>
    <path d="M27 22.25c-0.831 0.002-1.598 0.277-2.215 0.739l0.010-0.007-3.299-2.998c0.82-1.097 1.313-2.479 1.313-3.977 0-1.614-0.572-3.094-1.525-4.249l0.009 0.011 3.644-3.643c0.584 0.391 1.302 0.624 2.074 0.624 2.077 0 3.76-1.683 3.76-3.76s-1.683-3.76-3.76-3.76c-2.077 0-3.76 1.683-3.76 3.76 0 0.773 0.233 1.491 0.633 2.088l-0.009-0.014-3.643 3.643c-1.145-0.944-2.627-1.517-4.244-1.517-0.937 0-1.828 0.192-2.638 0.54l0.044-0.017-1.032-1.874c0.791-0.688 1.288-1.695 1.288-2.819 0-2.060-1.67-3.729-3.729-3.729s-3.729 1.67-3.729 3.729c0 2.060 1.67 3.729 3.729 3.729 0.007 0 0.015-0 0.022-0h-0.001c0.398-0.006 0.778-0.073 1.133-0.194l-0.026 0.008 1.037 1.883c-1.757 1.243-2.89 3.265-2.894 5.553v0.001c0.010 0.697 0.125 1.364 0.33 1.99l-0.013-0.047-1.423 0.603c-0.681-0.971-1.795-1.597-3.056-1.597-2.056 0-3.722 1.666-3.722 3.722s1.666 3.722 3.722 3.722c2.056 0 3.722-1.666 3.722-3.722 0-0.264-0.027-0.521-0.079-0.769l0.004 0.024 1.419-0.602c1.167 2.093 3.367 3.485 5.892 3.485 1.73 0 3.308-0.654 4.5-1.728l-0.006 0.005 3.309 3.007c-0.335 0.544-0.535 1.201-0.539 1.906v0.001c0 2.071 1.679 3.75 3.75 3.75s3.75-1.679 3.75-3.75c0-2.071-1.679-3.75-3.75-3.75v0zM7.69 5c0-1.243 1.007-2.25 2.25-2.25s2.25 1.007 2.25 2.25c0 1.243-1.007 2.25-2.25 2.25v0c-1.242-0.002-2.248-1.008-2.25-2.25v-0zM5 22.92c-1.242-0.001-2.248-1.007-2.248-2.249s1.007-2.249 2.249-2.249c1.242 0 2.248 1.006 2.249 2.248v0c-0.002 1.242-1.008 2.248-2.25 2.25h-0zM27 2.75c1.243 0 2.25 1.007 2.25 2.25s-1.007 2.25-2.25 2.25c-1.243 0-2.25-1.007-2.25-2.25v0c0.002-1.242 1.008-2.248 2.25-2.25h0zM10.69 16c0-0 0-0 0-0.001 0-2.932 2.377-5.309 5.309-5.309s5.309 2.377 5.309 5.309c0 2.932-2.377 5.309-5.309 5.309h-0c-2.931-0.003-5.306-2.378-5.31-5.308v-0zM27 28.25c-1.243 0-2.25-1.007-2.25-2.25s1.007-2.25 2.25-2.25c1.243 0 2.25 1.007 2.25 2.25v0c-0.002 1.242-1.008 2.248-2.25 2.25h-0z"></path>
  </svg>
)
const CommentIcon = () => (
  <svg width="15px" height="15px" viewBox="3 3 18 18" fill="blue" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.82698 7.13803L5.27248 7.36502L4.82698 7.13803ZM5.2682 18.7318L5.62175 19.0854H5.62175L5.2682 18.7318ZM17.862 16.173L17.635 15.7275L17.862 16.173ZM19.173 14.862L18.7275 14.635L19.173 14.862ZM19.173 7.13803L18.7275 7.36502V7.36502L19.173 7.13803ZM17.862 5.82698L18.089 5.38148V5.38148L17.862 5.82698ZM6.13803 5.82698L6.36502 6.27248L6.13803 5.82698ZM7.20711 16.7929L7.56066 17.1464L7.20711 16.7929ZM5 10.3C5 9.45167 5.00039 8.84549 5.03921 8.37032C5.07756 7.90099 5.15089 7.60366 5.27248 7.36502L4.38148 6.91103C4.17609 7.31413 4.08593 7.75771 4.04253 8.28889C3.99961 8.81423 4 9.46817 4 10.3H5ZM5 11.5V10.3H4V11.5H5ZM4 11.5V16.5H5V11.5H4ZM4 16.5V18.4136H5V16.5H4ZM4 18.4136C4 19.26 5.02329 19.6838 5.62175 19.0854L4.91465 18.3782C4.91754 18.3753 4.92812 18.368 4.94323 18.3654C4.9556 18.3632 4.96421 18.3654 4.96913 18.3674C4.97406 18.3695 4.98164 18.374 4.98888 18.3843C4.99771 18.3968 5 18.4095 5 18.4136H4ZM5.62175 19.0854L7.56066 17.1464L6.85355 16.4393L4.91465 18.3782L5.62175 19.0854ZM14.7 16H7.91421V17H14.7V16ZM17.635 15.7275C17.3963 15.8491 17.099 15.9224 16.6297 15.9608C16.1545 15.9996 15.5483 16 14.7 16V17C15.5318 17 16.1858 17.0004 16.7111 16.9575C17.2423 16.9141 17.6859 16.8239 18.089 16.6185L17.635 15.7275ZM18.7275 14.635C18.4878 15.1054 18.1054 15.4878 17.635 15.7275L18.089 16.6185C18.7475 16.283 19.283 15.7475 19.6185 15.089L18.7275 14.635ZM19 11.7C19 12.5483 18.9996 13.1545 18.9608 13.6297C18.9224 14.099 18.8491 14.3963 18.7275 14.635L19.6185 15.089C19.8239 14.6859 19.9141 14.2423 19.9575 13.7111C20.0004 13.1858 20 12.5318 20 11.7H19ZM19 10.3V11.7H20V10.3H19ZM18.7275 7.36502C18.8491 7.60366 18.9224 7.90099 18.9608 8.37032C18.9996 8.84549 19 9.45167 19 10.3H20C20 9.46817 20.0004 8.81423 19.9575 8.28889C19.9141 7.75771 19.8239 7.31413 19.6185 6.91103L18.7275 7.36502ZM17.635 6.27248C18.1054 6.51217 18.4878 6.89462 18.7275 7.36502L19.6185 6.91103C19.283 6.25247 18.7475 5.71703 18.089 5.38148L17.635 6.27248ZM14.7 6C15.5483 6 16.1545 6.00039 16.6297 6.03921C17.099 6.07756 17.3963 6.15089 17.635 6.27248L18.089 5.38148C17.6859 5.17609 17.2423 5.08593 16.7111 5.04253C16.1858 4.99961 15.5318 5 14.7 5V6ZM9.3 6H14.7V5H9.3V6ZM6.36502 6.27248C6.60366 6.15089 6.90099 6.07756 7.37032 6.03921C7.84549 6.00039 8.45167 6 9.3 6V5C8.46817 5 7.81423 4.99961 7.28889 5.04253C6.75771 5.08593 6.31413 5.17609 5.91103 5.38148L6.36502 6.27248ZM5.27248 7.36502C5.51217 6.89462 5.89462 6.51217 6.36502 6.27248L5.91103 5.38148C5.25247 5.71703 4.71703 6.25247 4.38148 6.91103L5.27248 7.36502ZM7.56066 17.1464C7.65443 17.0527 7.78161 17 7.91421 17V16C7.51639 16 7.13486 16.158 6.85355 16.4393L7.56066 17.1464Z" fill="#222222" />
    <path d="M8.5 9.5L15.5 9.5M8.5 12.5H13.5" stroke="#2A4157" strokeOpacity="0.24" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function CardList() {
  const context = useData();
  const navigate = useNavigate();
  const [params,] = useSearchParams();
  const defaultGraph = { nodes: [{"id": "1234", "title": "a book"},],links: [{"source": "1234", "target": "4321"},],}

  function toArray(lists) {
    let keys = Object.getOwnPropertyNames(lists)
    let res = []
    for (let index = 0; index < keys.length; index++) {
      res.push(lists[keys[index]])
    }
    return res;
  }

  let openGraph = (item) => {
    
    let graphParams = { bookid: item.book_id, neighbor: 3};
   
    getGraph(graphParams, context.setGraphLoading)
      .then((res) => {
        if (res == 404) {
          context.setGraph(defaultGraph);
        } else {
          context.setGraph(res);
        }
      })
      .catch(err => context.setGraph(defaultGraph));
    context.setGraphShow(true);
  }

  let openComment = (item) =>{
    context.setComments(item.comments ? item.comments: []);
    context.setCommentShow(true);
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

  let sendScore = (score, book_id) => {
    if (context.user) {
      let url = serverHost + `sendscore`;
      let rating = { uid: context.user, bookid: book_id, score: score };
      postData(url, rating);
    }
  }

  let description = (item, index) => {
    return <div key={index}>
      <div style={{ display: 'flex', flexFlow: 'row' }}>
        <div id="item_image" style={{ width: "15%", textAlign: 'center', marginTop: "5%" }}>
          <Image
            style={{ height: '100%' }}
            src={item.image_url ? item.image_url : 'error'}
            fallback='https://miro.medium.com/max/1400/1*qdFdhbR00beEaIKDI_WDCw.gif'
          />
        </div>
        <div id="item_information" style={{ width: "80%", marginLeft: '10px' }}>
          <Title id="book_title" level={4}>{item.title}</Title>
          <Rate value={item.average_rating} onChange={(value) => sendScore(value, item.book_id)} allowHalf></Rate>
          <div>by: {item.author_list}</div>
          <div>country: {item.country_code}</div>
          <div>language: {item.language_code}</div>
          <div>link: <a href={item.url}>{item.url}</a></div>
          {randomTag(item)}
          <div key={index}><CustomeP description={item.description} /></div>
          <Tooltip title="Open Graph" color={"blue"}>
            <Button icon={<Icon component={GraphIcon} />} onClick={() => openGraph(item)} /> 
          </Tooltip>
          <Tooltip title="Open Comment" color={"blue"}>
            <Button icon={<Icon component={CommentIcon}/>} style={{marginLeft:"5px"}} onClick={()=>openComment(item)}/>
          </Tooltip>
        </div>
      </div>
    </div>
  }
  let getPageInfo = (page, pageSize) => {
    let rangeFrom = (page * pageSize) - pageSize;
    let rangeTo = (page * pageSize) - 1;
    let uid = params.get("uid");
    let method = params.get("query_type");
    let query = params.get("query");
    let score = params.get("score");
    let parameter = { uid: uid, method: method, query: query, rangeFrom: rangeFrom, rangeTo: rangeTo, score: score };
    navigate(`/search?uid=${uid}&query_type=${method}&query=${query}&result_range_from=${rangeFrom}&result_range_to=${rangeTo}&score=${score}`);
    getData(parameter, context.setLoading)
      .then((books) => {context.setResult(toArray(books.result_list)); context.setResponseTime(books.time);})
      .catch(err => { console.log(err) })
      .then(() => context.setLoading(false));
    context.setPage(page);
  }

  const pagination = {
    position: 'bottom',
    align: 'center',
    pageSize: 10,
    size: 'default',
    total: context.num_res,
    onChange: (page, pageSize) => { getPageInfo(page, pageSize) },
    showSizeChanger: false,
    current: context.page

  }

  return useMemo(() => {
    return <List
      id='CardList'
      pagination={pagination}
      align='left'
      split={true}
      loading={context.loading}
      size='small'
      header={<Text strong>Found {context.num_res} Results in {context.responseTime ? context.responseTime: 0}s</Text>}
      dataSource={context.result}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            description={description(item, index)}
          />
        </List.Item>
      )}
    />
  }, [context.loading, context.result, context.page, context.responseTime])
}

export default CardList