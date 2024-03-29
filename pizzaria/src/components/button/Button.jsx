import React from 'react'
import './buttonstyle.css'


// eslint-disable-next-line react/prop-types
const Button = ({childreen, onClick}) => {
    return (
      <div>
      <button onClick={onClick} className="pushable">
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">
        {childreen}
      </span>
    </button>
      </div>
    );
  };

export default Button