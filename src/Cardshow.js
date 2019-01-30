import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export const Cardshow =(props)=> {
    return (
    <Card style={{width:'200px',display:'inline-block',position:'relative',top:'29px',height:'auto'}} onClick={()=>{props.imageClick()}}>
    <img  src={require(`${props.dataValue.imagePath}`)} alt={props.dataValue.name} width="150" />
    <CardContent>
          <div style={{ fontSize: '14px',fontWeight:'bold'}}>{props.dataValue.name}</div>
          <div style={{ fontSize: '14px',fontWeight:'bold'}}>{`$${props.dataValue.price}`}</div>
        </CardContent>
    </Card>
    )
}
