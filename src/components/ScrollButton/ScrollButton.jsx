import React from 'react';
import './ScrollButton.css';
import chevronLeft from '../../assets/chevron_left.png';
import chevronRight from '../../assets/chevron_right.png';
const ScrollButton = ({ direction, targetRef }) => {
    const handleScroll = () => {
      if (targetRef.current) {
        const scrollAmount = direction === 'right' ? 500 : -500;
        targetRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };
  
    return (
      <button className={`scroll-button ${direction}`} onClick={handleScroll}>
        <img src={direction === 'right' ? chevronRight : chevronLeft} alt={`Scroll ${direction}`} />
      </button>
    );
  };
  
  export default ScrollButton;