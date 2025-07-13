import React from 'react'
import Starfilling from './Starfilling';


const Rating = ({rating,reviews}) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const diff = rating - i;
      const fill = diff >= 1 ? 1 : diff > 0 ? diff : 0;
      stars.push(<Starfilling key={i} fill={fill} />);
    }
    return <div className="star-container text-center">{stars} <p className='font-semibold ml-2  '>{reviews} reviews</p></div>;
}

export default Rating

