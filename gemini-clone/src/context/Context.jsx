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
    
    const delayPara = (index,nextWord) => {
        
    }

    const getAiResponse = async () => {
        setLoading(true);
        setShowResult(true);
        setResultData("");
        setRecentPromt(input);
        let result = await runChat(input);
        let resultArr = result.split("**");
        let newResult = "";
        for (let i = 0; i < resultArr.length; i++) {
            if(i===0 || i%2 !==1){
                newResult+=resultArr[i];
            }
            else{
                newResult+= "<b><span class='hyperLinkFromAi' onClick='clickHyperLinkFromAi(this.innerText)' ><u>"+resultArr[i]+"</u><span></b>";
            }
        }
        let newResult2 = newResult.split("*").join("</br></br>");
        setResultData(newResult2);
        setLoading(false);
        setInput("");
    }

    window.clickHyperLinkFromAi = (text) => {
        setInput((prev) => prev + text);
    }

    // getAiResponse("what is react");
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
        getAiResponse,
        showResult,
        setShowResult
    };
  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
}

export default ContextProvider;