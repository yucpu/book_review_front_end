import React, {useState,useEffect,useContext}from 'react'
import { Space, Select, AutoComplete, Button, } from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import { serverHost, useData, getData} from '../data';

const{Option} = Select

function SearchBar(props) {
    const {method,query,options,setQuery,setOptions,selectMethod,result,setResult} = useData();
    const {show,setShow,identity} = props

    useEffect(()=>{
        // console.log(method)
    },[])

    function toArray(lists){
      let keys = Object.getOwnPropertyNames(lists)
      let res = []
      for (let index=0; index < keys.length; index++){
        res.push(lists[keys[index]])
      }
      return res;
    }

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
        let url = serverHost+`search?uid=${12345}&query_type=${method}&query=${query}&result_range_from=${0}&result_range_to=${20}`
        console.log(url)
        if(identity == "HomePage") {

          let a = {1:{"book":"wode"}, 2:{"book":"nide"},3:{"book":"nide"},4:{"book":"nide"},5:{"book":"nide"},7:{"book":"nide"}}
         

          getData(url,{}).then((books)=> setResult(toArray(books.result_list))).catch(err=>{console.log(err)}).then(setShow(!show)).then(console.log(result));
          setShow(!show)
          console.log("from home")
        }else{
          console.log("from result")
          getData(url,{}).then((books)=> setResult(toArray(books.result_list))).catch(err=>{console.log(err)}).then(setShow(!show)).then(console.log(result));
          // setShow(!show)
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
                    <Option value="boolean">Boolean Seach</Option>
                    <Option value="proximity">Proximity Seach</Option>
                    <Option value="phrase">Free Search</Option>
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