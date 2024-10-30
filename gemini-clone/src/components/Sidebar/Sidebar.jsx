import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Sidebar = () => {
  const [extended, setextended] = useState(true);
  const {getAiResponse , prevPromts, setRecentPromt, newChat} = useContext(Context);
  
  const loadPrompt = (promt) => {
    console.log(getAiResponse)
    setRecentPromt(promt);
    getAiResponse(promt);
  }
  
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setextended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        {extended ? (
          <div onClick={() => newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            <p>New Chat</p>
          </div>
        ) : null}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPromts.map((item, index) =>{
                return (
                    <div onClick={()=> loadPrompt(item)} key={index} className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p title={item} className="">{item}</p>
                    </div>
                )
            })
            }
            
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
