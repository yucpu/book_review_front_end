import { useState, createContext,useContext } from "react";
import { useSearchParams } from "react-router-dom";

export const DataContext = createContext(null);
const {Provider} = DataContext;
export const serverHost = 'https://5a99fca3-8b52-4c33-b65c-6baf5893fce1.mock.pstmn.io/'


const autoSuggestionCig = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd7ab2fd67bmsh64a9a4f50904490p121abdjsn8e3d8a805b0b',
      'X-RapidAPI-Host': 'auto-suggest-queries.p.rapidapi.com'
    }
  };

export const DataProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [method,setMethod] = useState("BM25");
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState("");
    const [result,setResult] = useState([]);
    const [num_res, setNum_res] = useState(0);
    const [loading, setLoading] = useState(false);
    const [graph,setGraph] = useState({ nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }], links: [{ source: "1", target: "2" }, { source: "2", target: "3" }, { source: "4", target: "1" }, { source: "4", target: "2" }]});
    const [commentShow, setCommentShow] = useState(false);
    const [comments, setComments] = useState([{user:"TTDS",score:2.5, comment:"Harry Potter is a beloved fantasy book series written by J.K. Rowling that has captured the hearts of millions of readers around the world. The series follows the story of a young wizard named Harry Potter who discovers his true identity and his role in the wizarding world."}]);
    const [page, setPage] = useState(1);
    const [score, setScore] = useState(0);
    const [chatLoading, setChatLoading] = useState(false);
    const [gptSuggest, setGptSuggest] = useState([]);
    const login = (user) => {
        setUser(user)
    }
    const loginOut = () => {
        setUser(null)
    }

    const selectMethod = (method) =>{
        setMethod(method)
    }

    return (
        <Provider value={{ user,setUser,login, loginOut, method, 
        selectMethod, options, setOptions, query, 
        setQuery, result,setResult,
        num_res, setNum_res, loading,setLoading,
        commentShow, setCommentShow, comments, setComments,
        graph,setGraph,page, setPage,
        score, setScore, chatLoading, setChatLoading,
        gptSuggest, setGptSuggest}}>
            {children}
        </Provider>
    )
}
export const useData = ()=>{
    return useContext(DataContext)
}


export async function getData(parameter={}, load){
    let url = serverHost + `search?uid=${parameter.uid}&query_type=${parameter.method}
    &query=${parameter.query}&result_range_from=${parameter.rangeFrom}&result_range_to=${parameter.rangeTo}
    &score=${parameter.score}`;
    load(true)
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
    
    })
    const response = await fetch(request);
    load(false)
    if(response.status == 404){
        return response.status;
    }
    return response.json();
}

export async function getChatGPT(query, load){
    load(true);
    let url = serverHost + `gpt?query=${query}`;
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
    })
    const response = await fetch(request);
    load(false)
    if(response.status == 404){
        return response.status;
    }
    
    return response.json();
}

export async function getGraph(graphParams={bookid:"8012931", neighbor:3}){
    let url = serverHost + `Graph?bookid=${graphParams.bookid}&neighbor=${graphParams.neighbor}`;
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
    
    })
    const response = await fetch(request);
    if(response.status == 404){
        return response.status;
    }
    console.log(response)
    return response.json();
}


export async function postData(url = '', data={}){

    let request = new Request(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(data)
    })
    const response = await fetch(request);
    return response;
}

export async function getSuggestion(query){
    let url = 'https://auto-suggest-queries.p.rapidapi.com/suggestqueries?query='+query;

    const response = await fetch(url, autoSuggestionCig);
    return response.json();
}

