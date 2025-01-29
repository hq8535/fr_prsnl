import React from "react";
import cl from './Umodal.module.css';

const Umodal = ({children, visible, setVisible, top}) => {
    const rootClasses = [cl.myModal];

    if (visible) {top ? rootClasses.push(cl.activeres) : rootClasses.push(cl.active);}

    return(
        <div className={rootClasses.join(' ')} >
            <div className={cl.myModalContent}>
                {children}
            </div>

        </div>
    )
}
export default Umodal