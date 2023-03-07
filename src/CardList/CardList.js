import React, { createElement, useMemo } from 'react';
import "../CardList/CardList.css";
import { List, Tag,Rate,Image} from 'antd';
import { useData, serverHost, getData } from '../data';


function CardList() {
  const context = useData()


  function toArray(lists) {
    let keys = Object.getOwnPropertyNames(lists)
    let res = []
    for (let index = 0; index < keys.length; index++) {
      res.push(lists[keys[index]])
    }
    if (res.length > 0) {
      context.setBook(res[0])
    } else {
      context.setBook({})
    }
    return res;
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

  let description = (item) => {
    return <div>
      <div style={{display:'flex', flexFlow:'row'}}>
        <div id="item_image" style={{width:"20%"}}>
            <Image
              style={{ height: '100%'}}
              src={item.image_url ? item.image_url : 'error'}
              fallback='https://miro.medium.com/max/1400/1*qdFdhbR00beEaIKDI_WDCw.gif'
            />
        </div>
        <div id="item_information" style={{width:"80%"}}>
          <Rate defaultValue={item.average_rating}></Rate>
          <div>by: {item.author_list}</div>
          <div>country: {item.country_code}</div>
          <div>language: {item.language_code}</div>
          <div>link: <a src={item.url}>link</a></div>
          <div></div>
          {randomTag(item)}
          <p style={{textOverflow:"ellipsis", overflow:'hidden',width:'70%', display:'block',whiteSpace:'nowrap'}}>{item.description}</p>
        </div>
      </div>
    </div>
  }

  let getPageInfo = (page, pageSize) => {
    let url2 = context.api;
    let result_from = (page * pageSize) - pageSize;
    let result_to = (page * pageSize) - 1;
    url2 += `&result_range_from=${result_from}&result_range_to=${result_to}`;
    getData(url2, context.setLoading).then((books) => context.setResult(toArray(books.result_list))).catch(err => { console.log(err) }).then(() => context.setLoading(false));
  }

  const pagination = {
    position: 'bottom',
    align: 'center',
    pageSize: 10,
    size:'default',
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
        <List.Item>
          <List.Item.Meta
            key={index}
            title={<a onClick={() => context.setBook(item)}>{item.title}</a>}
            description={description(item)}
          />
        </List.Item>
      )}
    />
  }, [context.loading, context.result])
}

export default CardList