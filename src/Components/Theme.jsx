import { useContext, useRef } from "react";
import { ThemeContext } from "../App";

const ThemeSet=()=>{
    const [theme,settheme]=useContext(ThemeContext)
    const toggle=useRef()
    function clickme(){
        console.log(theme,"im theme");
        if (theme) {
            toggle.current.style.marginLeft = "54%";
            settheme(false);
        } else {
            toggle.current.style.marginLeft = "0%";

            toggle.current.style.marginRight = "54%";
            settheme(true);
        }        
    }
    return<>
    <div className="toggle"   onClick={clickme}>
       <div className="ball" ref={toggle} ></div>
    </div>
    </>
}
export default ThemeSet;