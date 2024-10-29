import { createContext } from "react";
import  runChat  from "../config/gemini"
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [input, setInput] = useState("")

    const [showResult, setShowResult] = useState(false)
    const [recentPromt, setRecentPromt] = useState("");
    const [prevPromts, setPrevPromts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")
    
    const onSent = async () => {
        setLoading(true);
        setShowResult(true);
        setResultData("");
        setRecentPromt(input);
        let result = await runChat(input);
        setResultData(result);
        setLoading(false);
        setInput("");
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
        onSent,
        showResult,
        setShowResult
    };
  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
}

export default ContextProvider;