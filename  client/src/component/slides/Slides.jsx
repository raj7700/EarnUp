import React from 'react'
import "./Slides.scss"
import Slider from "infinite-react-carousel";
const Slides = ({children,slidesToShow,arrowsScroll}) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
            {children}
        </Slider>
      </div>
    </div>
  );
}

export default Slides