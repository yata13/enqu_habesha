import React from 'react';

const Pics = (props) => {
    return (
        <div className='picsDiv-contener'>
            <div className='picsDiv1'>
                <img className='picsImg0' src={props.picsImg0}/>
                <h1 className='enku enku1'>እንቁ</h1> 
                <img className='picsImg1' src={props.picsImg1}/>
            </div>  
            <div className='picsDiv2'>
                <h1 className='enku enku2'>ጥበብ</h1>
                <img className='picsImg2' src={props.picsImg2}/>
            </div>  
        </div>
    );
}

export default Pics;
