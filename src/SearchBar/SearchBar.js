import React, { useEffect} from 'react'
import { Space, Select, AutoComplete, Button, Tooltip, } from 'antd'
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {useData, getData, getSuggestion, getChatGPT } from '../data';
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
    let parameter = {uid:user, method:method,query:query,rangeFrom:0,rangeTo:9,score:0};
    if (identity == "HomePage") {
      // navigate to the result page
      navigate(`/search?uid=${context.user}&query_type=${context.method}&query=${context.query}&result_range_from=${0}&result_range_to=${9}&score=${0}`);
    } else {
      navigate(`/search?uid=${context.user}&query_type=${context.method}&query=${context.query}&result_range_from=${0}&result_range_to=${9}&score=${0}`);
      getData(parameter, context.setLoading).
      then((books) => { setResult(toArray(books.result_list)); context.setNum_res(books.result_num); context.setResponseTime(books.time);})
      .catch(err => { context.setLoading(false); setResult([]) });
      context.setGraph({nodes:[],links:[]})
      getChatGPT(query, context.setChatLoading).then((res)=>context.setGptSuggest(res.suggest)).catch(err=>context.setChatLoading(false));
      context.setPage(1);
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
            <Option title="'[NOT] [Token/Phrase]' [AND/OR] ..." value="boolean">Boolean Seach</Option>
            <Option title="[#number] [(token1, token2)]" value="proximity">Proximity Seach</Option>
            <Option title="[Any Words]" value="colBERT">colBERT</Option>
            <Option title="[Any Words]" value="tfidf">TFIDF</Option>
            <Option title="[Any Words]" value="bm25">BM25</Option>
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