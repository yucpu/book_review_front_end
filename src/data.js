import { useState, createContext,useContext } from "react";

export const DataContext = createContext(null);
const {Provider} = DataContext;
export const serverHost = 'https://def12a61-6f6c-45a4-bce8-86f33b2a613e.mock.pstmn.io/'

export const DataProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [method,setMethod] = useState("2");
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState("");
    const [result,setResult] = useState("Empty");
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
        <Provider value={{ user, login, loginOut, method, selectMethod, options, setOptions, query, setQuery, result,setResult}}>
            {children}
        </Provider>
    )
}
export const useData = ()=>{
    return useContext(DataContext)
}

export async function getData(url = ''){
  
    let request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
    })
    const response = await fetch(request);
    return response.json();
}

export async function postData(url = '', data={}){
 
    let request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        headers : {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(data)
    })
    const response = await fetch(request);
    return response;
}

