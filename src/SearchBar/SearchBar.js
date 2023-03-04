import React, {useEffect}from 'react'
import { Space, Select, AutoComplete, Button, } from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import { serverHost, useData, getData} from '../data';

const{Option} = Select

function SearchBar(props) {
    const context = useData();
    const {method,query,options,setQuery,setOptions,selectMethod,result,setResult,setBook} = useData();
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
      if(res.length > 0){
        setBook(res[0])
      }else{
        setBook({})
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
        console.log(identity)
        console.log(`Query type ${method} : ${query}`);
        let url = serverHost+`search?uid=${12345}&query_type=${method}&query=${query}&result_range_from=${0}&result_range_to=${9}`;
        let url2 = serverHost+`search?uid=${12345}&query_type=${method}&query=${query}`;
        console.log(url)
        if(identity == "HomePage") {

          getData(url,context.setLoading).then((books)=> {setResult(toArray(books.result_list)); context.setNum_res(books.result_num); context.setApi(url2)}).catch(err=>{console.log(err)}).then(setShow(!show));
          console.log("from home")
        }else{
          console.log("from result")
          // context.setLoading(true);
                    let a = {
            1: {
              "language_code": "US",
              "country_code": "Bangladesh",
              "ratings_count": 36,
              "image_url": "http://placehold.it/32x32",
              "average_rating": 8,
              "title": "Utah",
              "url": "https://www.goodreads.com/book/show/7327624-the-unschooled-wizard",
              "publication_year": 2008,
              "publication_month": 3,
              "publication_day": 5,
              "num_pages": 441,
              "date": "1970-2-3",
              "author_list": [
                "Case Blackwell",
                "Catalina Hunter"
              ],
              "publisher": "FRANSCENE",
              "description": "252 Seabring Street, Bancroft, Oklahoma, 6213"
            },
            2: {
              "language_code": "US",
              "country_code": "Chile",
              "ratings_count": 115,
              "image_url": "http://placehold.it/32x32",
              "average_rating": 8,
              "title": "Wisconsin",
              "url": "https://www.goodreads.com/book/show/7327624-the-unschooled-wizard",
              "publication_year": 1972,
              "publication_month": 0,
              "publication_day": 3,
              "num_pages": 466,
              "date": "2001-7-6",
              "author_list": [
                "Mitzi Lindsey",
                "Michael Tyler"
              ],
              "publisher": "ANARCO",
              "description": "553 Schaefer Street, Marbury, West Virginia, 6123"
            },
            3: {
              "language_code": "US",
              "country_code": "Croatia (Hrvatska)",
              "ratings_count": 245,
              "image_url": "https://images.gr-assets.com/books/1304100136m/7327624.jpg",
              "average_rating": 7,
              "title": "American Samoa",
              "url": "https://www.goodreads.com/book/show/7327624-the-unschooled-wizard",
              "publication_year": 2002,
              "publication_month": 5,
              "publication_day": 1,
              "num_pages": 649,
              "date": "2010-3-4",
              "author_list": [
                "Owens Mason",
                "Heidi Gardner"
              ],
              "publisher": "ORGANICA",
              "description": "492 Howard Place, Verdi, District Of Columbia, 4332"
            }
          }
          getData(url,context.setLoading).then((books)=> {setResult(toArray(a)); context.setNum_res(books.result_num); context.setApi(url2)}).catch(err=>{console.log(err)});
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