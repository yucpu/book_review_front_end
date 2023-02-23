import { useState, createContext,useContext } from "react";

export const DataContext = createContext(null);
const {Provider} = DataContext;


export const DataProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [method,setMethod] = useState("2");
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState("");


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
        <Provider value={{ user, login, loginOut, method, selectMethod, options, setOptions, query, setQuery}}>
            {children}
        </Provider>
    )
}
export const useData = ()=>{
    return useContext(DataContext)
}