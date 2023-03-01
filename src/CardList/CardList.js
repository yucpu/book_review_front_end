import React from 'react';
import "../CardList/CardList.css";
import {Button, List } from 'antd';
import { useData } from '../data';

function CardList() {
    const context = useData()

    const custome = (item) =>{
       return <List.Item>{item.title} <Button>dd</Button></List.Item>
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