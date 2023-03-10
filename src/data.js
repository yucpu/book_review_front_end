import { useState, createContext,useContext } from "react";

export const DataContext = createContext(null);
const {Provider} = DataContext;
export const serverHost = 'https://769c8b6b-fb9c-4090-91ce-c4b37a9545be.mock.pstmn.io/'

export const DataProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [method,setMethod] = useState("phrase");
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState("");
    const [result,setResult] = useState([]);
    const [num_res, setNum_res] = useState(0);
    const [loading, setLoading] = useState(false);
    const [graph,setGraph] = useState({});
    const [commentShow, setCommentShow] = useState(false);
    const [comments, setComments] = useState([]);
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
        commentShow, setCommentShow,
        graph,setGraph}}>
            {children}
        </Provider>
    )
}
export const useData = ()=>{
    return useContext(DataContext)
}

export async function getData(url = '', load){
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
    return response.json();
}

export async function postData(url = '', data={}, load){
    load(false);
    let request = new Request(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(data)
    })
    load(false)
    const response = await fetch(request);
    return response;
}

