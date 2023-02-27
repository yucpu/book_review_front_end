import React, {useState,useEffect,useContext}from 'react'
import { Space, Select, AutoComplete, Button, } from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import { useData } from '../data';

const{Option} = Select

function SearchBar(props) {
    const {method,query,options,setQuery,setOptions,selectMethod,} = useData();
    const {show,setShow,identity} = props

    useEffect(()=>{
        // console.log(method)
    },[])

    const handleKey = (e)=>{
        if(e.code == "Enter"){
          console.log("search By Enter")
          console.log("Query type: "+method+" ->"+ query);
        }
    }

    const handleInput = (value) =>{
        setQuery(value)
        setOptions(value ? queryExpansion(value):[]); // asyn   
    }

    const handleSearchByButton = (value, event)=>{
        // AJAX
        // classifiy type of command (Enter Clear Click)
        //setOptions([{value:"enter"}])
        console.log(identity)
        console.log(`Query type ${method} : ${query}`);
        if(identity == "HomePage") {
            setShow(!show);
        }
    
      }

    const queryExpansion = (value)=>{
        let answer = new Promise((resolve,reject)=>{
          // get 
          let res = true
          if (res){
            resolve("Success: " + value);
          }else{
            reject("Failed: " + value);
          }
        }).then( res => {
          setOptions([{value:res}])  
        }, err =>{
          setOptions([{value:err}])
        })
    }
    return (
        <div id='SearchBar' >
            <Space.Compact style={{width:"100%"}}>
                <Select defaultValue={method} style={{width:'30%'}} onSelect={selectMethod}>
                    <Option value="0">Boolean Seach</Option>
                    <Option value="1">Proximity Seach</Option>
                    <Option value="2">Free Search</Option>
                </Select>
                <AutoComplete 
                    style={{width:'60%'}}
                    allowClear
                    value={query}
                    options={options}
                    onChange={handleInput}
                    onKeyDown = {handleKey}>
                </AutoComplete>
                    <Button 
                        type='primary'
                        loading = {false}
                        icon={<SearchOutlined/>}
                        onClick={handleSearchByButton.bind(null,query)}
                        style={{width:'10%'}}/>
            </Space.Compact>
        </div>
    )
}

export default SearchBar