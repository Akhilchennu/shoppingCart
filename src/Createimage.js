import React from 'react';
import {Cardshow} from './Cardshow.js'; 

export const Createimage =(props)=> {
    return (
        !props.hovered?
    <img  onClick={()=>{props.imageClick()}}  onMouseOver={()=>{props.imageHover(props.dataValue)}} onMouseLeave={(e)=>{props.imageHoverLeave(e)}} src={require(`${props.src}`)} alt={props.alt} width="150" />
    :<Cardshow imageClick={()=>{props.imageClick()}} dataValue={props.dataValue} />)
}

 