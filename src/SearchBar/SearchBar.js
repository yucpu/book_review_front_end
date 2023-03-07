import React from 'react'
import { Space, Select, AutoComplete, Button, } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { serverHost, useData, getData } from '../data';

const { Option } = Select

function SearchBar(props) {
  const context = useData();
  const { method, query, options, setQuery, setOptions, selectMethod, setResult, setBook } = useData();
  const { show, setShow, identity } = props

  function toArray(lists) {
    let keys = Object.getOwnPropertyNames(lists)
    let res = []
    for (let index = 0; index < keys.length; index++) {
      res.push(lists[keys[index]])
    }
    if (res.length > 0) {
      setBook(res[0])
    } else {
      setBook({})
    }
    return res;
  }

  const handleKey = (e) => {
    if (e.code == "Enter") {
      console.log("search By Enter")
      console.log("Query type: " + method + " ->" + query);
    }
  }

  const handleInput = (value) => {
    setQuery(value)
    setOptions(value ? queryExpansion(value) : []); // asyn   
  }


  const handleSearchByButton = (value, event) => {
    // console.log(identity)
    // console.log(`Query type ${method} : ${query}`);
    let url = serverHost + `search?uid=${12345}&query_type=${method}&query=${query}&result_range_from=${0}&result_range_to=${10}`;
    let url2 = serverHost + `search?uid=${12345}&query_type=${method}&query=${query}`;
    // console.log(url)
    if (identity == "HomePage") {
      getData(url, context.setLoading).then((books) => { setResult(toArray(books.result_list)); context.setNum_res(books.result_num); context.setApi(url2) }).catch(err => { context.setLoading(false); setResult([]); }).then(setShow(!show));
      console.log("from home")
    } else {
      console.log("from result")
      // context.setLoading(true);
      getData(url, context.setLoading).then((books) => { setResult(toArray(books.result_list)); context.setNum_res(books.result_num); context.setApi(url2) }).catch(err => { context.setLoading(false); setResult([]) });
    }

  }

  const queryExpansion = (value) => {
    let answer = new Promise((resolve, reject) => {
      // get 
      let res = true
      if (res) {
        resolve("Success: " + value);
      } else {
        reject("Failed: " + value);
      }
    }).then(res => {
      setOptions([{ value: res }])
    }, err => {
      setOptions([{ value: err }])
    })
  }
  return (
    <div id='SearchBar' >
      <Space.Compact style={{ width: "100%" }}>
        <Select defaultValue={method} style={{ width: '30%' }} onSelect={selectMethod}>
          <Option value="boolean">Boolean Seach</Option>
          <Option value="proximity">Proximity Seach</Option>
          <Option value="phrase">Free Search</Option>
        </Select>
        <AutoComplete
          style={{ width: '60%' }}
          allowClear
          value={query}
          options={options}
          onChange={handleInput}
          onKeyDown={handleKey}
          placeholder="Search Book by Typing Something">
        </AutoComplete>
        <Button
          type='primary'
          loading={false}
          icon={<SearchOutlined />}
          onClick={handleSearchByButton.bind(null, query)}
          style={{ width: '10%' }} />
      </Space.Compact>
    </div>
  )
}

export default SearchBar