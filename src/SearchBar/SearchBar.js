import React, { useEffect} from 'react'
import { Space, Select, AutoComplete, Button, } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { serverHost, useData, getData, getSuggestion } from '../data';
import { useNavigate } from 'react-router-dom';
const { Option } = Select

function SearchBar(props) {
  const context = useData();
  const navigate = useNavigate();
  const { user, method, query, options, setQuery, setOptions, selectMethod, setResult } = useData();
  const {identity } = props;
  let timeOutId = null;

  useEffect(()=>{
    if(query){
      timeOutId = setTimeout(()=>{queryExpansion(query)},300);
    }
  },[query])


  function toArray(lists) {
    let keys = Object.getOwnPropertyNames(lists)
    let res = []
    for (let index = 0; index < keys.length; index++) {
      res.push(lists[keys[index]])
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
    clearTimeout(timeOutId);
    if (!value){
      setOptions([])
      setQuery(value);
      return;
    }
    setQuery(value);
       
  }


  const handleSearchByButton = (value, event) => {
    // console.log(identity)
    // console.log(`Query type ${method} : ${query}`);
    let url = serverHost + `search?uid=${user}&query_type=${method}&query=${query}&result_range_from=${0}&result_range_to=${10}`;
    if (identity == "HomePage") {
      navigate(`/search?uid=${context.user}&query_type=${context.method}&query=${context.query}&result_range_from=${0}&result_range_to=${9}&score=${0}/`);
      console.log("from home")
    } else {
      console.log("from result")
      navigate(`/search?uid=${context.user}&query_type=${context.method}&query=${context.query}&result_range_from=${0}&result_range_to=${9}&score=${0}/`);
      getData(url, context.setLoading).then((books) => { setResult(toArray(books.result_list)); context.setNum_res(books.result_num); }).catch(err => { context.setLoading(false); setResult([]) });
    }
  }
  const queryExpansion = (value) => {
    getSuggestion(value).then(res => {
      let temp = []
      for (let index = 0; index < res.length / 2; index++) {
        temp.push({ value: res[index] })
      }
      setOptions(temp)
    }, err => {
      setOptions([{ value: "No suggestion" }])
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