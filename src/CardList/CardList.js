import React from 'react';
import "../CardList/CardList.css";
import {Button, List } from 'antd';
import { useData } from '../data';

function CardList() {
    const context = useData()

    let detailCheck = (item, index) =>{
        context.setBook(item);
    }

    let custome = (item, index) =>{
       return <List.Item onClick={detailCheck.bind(this,item,index)}
        >
        {item.title} {item.num_pages} {item.language_code} {item.country_code}
        </List.Item>
    }

    return (
        <List 
            id='CardList'
            pagination={{position:'bottom',align:'center',pageSize:8}}
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