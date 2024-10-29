import { createContext } from "react";
import  runChat  from "../config/gemini"
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [input, setInput] = useState("")

    const [recentPromt, setRecentPromt] = useState("");
    const [prevPromts, setPrevPromts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")
    
    const onSent = async () => {
        let result = await runChat(input);
    }

    // onSent("what is react");
    const contextValue = {
        input,
        setInput,
        recentPromt,
        setRecentPromt,
        prevPromts,
        setPrevPromts,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent
    };
  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
}

export default ContextProvider;