import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import "./Main.css";
import { useContext } from "react";

const Main = () => {
  const {
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
    showResult,
    setShowResult,
    getAiResponse,
  } = useContext(Context);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.target.value = "";
      getAiResponse();
    }
  };
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept : Urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPromt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleKeyPress}
              value={input}
              type="text"
              placeholder="Enter a promt here"
            />
            <div className="">
              {/* <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" /> */}
              <img onClick={() => getAiResponse()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check before using it to make decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
