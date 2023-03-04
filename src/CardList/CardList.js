import React, { Children, createElement, useEffect } from 'react';
import "../CardList/CardList.css";
import {List,Tag} from 'antd';
import { useData, serverHost, getData} from '../data';


function CardList() {
    const context = useData()


    function toArray(lists){
        let keys = Object.getOwnPropertyNames(lists)
        let res = []
        for (let index=0; index < keys.length; index++){
          res.push(lists[keys[index]])
        }
        if(res.length > 0){
          context.setBook(res[0])
        }else{
          context.setBook({})
        }
        return res;
    }


    let randomTag = (item) =>{
      let colors = ["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"];
      let tags = item.popular_shelves ? item.popular_shelves: [];
      let childs = ["Keyword: "];
      if (tags.length == 0){
        return <div>No one know this ?</div>
      }else if (tags.length >= 4){
        for(let i=0; i < 5; i++ ){
          childs.push(<Tag key={i} color={colors[Math.floor(Math.random() * colors.length)]}>{tags[i].name }</Tag>)
        }
      }else{
        for(let i=0; i < tags.length; i++ ){
          childs.push(<Tag key={i} color={colors[Math.floor(Math.random() * colors.length)]}>{tags[i].name }</Tag>)
        }
      }
      let res = createElement("div",null,childs);
      return res;
    }
    
    let description = (item) =>{
      return <div>
                <div>
                  Total Pages: {item.num_pages}, 
                  Country: {item.country_code},
                  language: {item.language_code}
                  {randomTag(item)}
                </div>
                
              </div>
    }

    // let customItem = (item, index) =>{
    //    return 
    // }

    let getPageInfo = (page, pageSize) =>{
        let url2 = context.api;
        let result_from= (page * pageSize) - pageSize;
        let result_to = (page * pageSize) - 1;
        url2  += `&result_range_from=${result_from}&result_range_to=${result_to}`;
        getData(url2, context.setLoading).then((books)=> context.setResult(toArray(books.result_list))).catch(err=>{console.log(err)}).then(()=>context.setLoading(false));
    }

    const pagination = {
        position:'bottom',
        align:'center',
        pageSize:10,
        total:context.num_res,
        onChange:(page, pageSize)=>{getPageInfo(page,pageSize)},
        showSizeChanger:false
     
    }

    return (
        <List 
            id='CardList'
            pagination={pagination}
            align='left'
            split={true}
            bordered
            loading={context.loading}
            size='small'
            dataSource={context.result}
            renderItem = {(item)=> ( 
              <List.Item
              >
                <List.Item.Meta
                  title = {<a onClick={()=>context.setBook(item)}>{item.title}</a>}
                  description={description(item)}
                />
              </List.Item>
            )}
        />
  )
}

export default CardList