import React, { useEffect } from 'react';
import "../CardList/CardList.css";
import {Button, List } from 'antd';
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

    let detailCheck = (item, index) =>{
        context.setBook(item);
    }
    let custome = (item, index) =>{
        // console.log(item)
       return <List.Item onClick={detailCheck.bind(this,item,index)}
        >
        {item.title} {item.num_pages} {item.language_code} {item.country_code}
        </List.Item>
    }

    let getPageInfo = (page, pageSize) =>{
        let url2 = context.api;
        let result_from= (page * pageSize) - pageSize;
        let result_to = (page * pageSize) - 1;
        url2  += `&result_range_from=${result_from}&result_range_to=${result_to}`;
        getData(url2,{}).then((books)=> context.setResult(toArray(books.result_list))).catch(err=>{console.log(err)});
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
            align='center'
            split='true'
            bordered
            size='large'
            dataSource={context.result}
            renderItem = {custome}
        />
  )
}

export default CardList