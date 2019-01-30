import React, { Component } from 'react';
import './App.css';
import {data} from './data.js';
import {Createimage} from './Createimage.js';
import 'bootstrap/dist/css/bootstrap.css';
import Select from 'react-select';
import Men from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import '../node_modules/material-design-icons';
import { Slider } from 'material-ui-slider';

 
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      originalData:data,
      imageData:data,
      selectOptions:[
        { value: 'Trending', label: 'Trending' },
        { value: 'LifeStyle', label: 'Lifestyle' },
        { value: 'HomeDecor', label: 'Home Decor' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Appliances', label: 'Appliances' }
      ],
      selectedOption:null,
      toggleValue:'',
      sliderValue:0,
      imageHovered:false,
      imageHoveredData:'',
      max:2500,
      min:1
    }
    this.onImageLeave=this.onImageLeave.bind(this);
  }

  handleChange=(selectedOption)=>{
    if(this.state.toggleValue!=='' && this.state.sliderValue!==0){
      this.setState({imageData:this.state.originalData.filter((value)=>value.category === selectedOption.value && value.searchFor === this.state.toggleValue
        && value.price <= this.state.sliderValue),
        selectedOption:selectedOption
      });    
    }else if(this.state.toggleValue !== '' && this.state.sliderValue === 0){
      this.setState({imageData:this.state.originalData.filter((value)=>value.category === selectedOption.value && value.searchFor === this.state.toggleValue),
        selectedOption:selectedOption
      });
    }else if(this.state.toggleValue === '' && this.state.sliderValue !==0){
      this.setState({imageData:this.state.originalData.filter((value)=>value.category === selectedOption.value
        && value.price <= this.state.sliderValue),
        selectedOption:selectedOption
      }); 
    }else{
    this.setState({imageData:this.state.originalData.filter((value)=>value.category === selectedOption.value),
      selectedOption:selectedOption
    });
  }   
  }
  selectToggleOption=(toggleValue)=>{
   if(this.state.selectedOption && this.state.selectedOption.value !== null && this.state.sliderValue !== 0){
    this.setState({imageData:this.state.originalData.filter((value)=>value.category === this.state.selectedOption.value && value.searchFor === toggleValue
      && value.price <= this.state.sliderValue,toggleValue)
    });
   }else if(this.state.selectedOption && this.state.selectedOption.value !== null && this.state.sliderValue === 0){
    this.setState({imageData:this.state.originalData.filter((value)=>value.category === this.state.selectedOption.value 
      && value.searchFor === toggleValue,toggleValue)
    });
   }else if(this.state.selectedOption === null && this.state.sliderValue !== 0){
    this.setState({imageData:this.state.originalData.filter((value)=> value.searchFor === toggleValue &&
      value.price <= this.state.sliderValue,toggleValue)
    });
   }else{
     this.setState({imageData:this.state.originalData.filter((value)=>value.searchFor === toggleValue),toggleValue});
   }
  }

  onImageClick=()=>{
  this.refs.hrefRef.click();
  }

  onImageHover=(data)=>{
  this.setState({
    imageHovered:true,
    imageHoveredData:data
  });
  }

  onImageLeave=(e)=>{
    alert()
    this.setState({
      imageHovered:false,
      imageHoveredData:''
    });
  }

  sliderChange = (sliderValue) => {
    this.setState({ sliderValue });
    if(this.state.selectedOption && this.state.selectedOption.value !== null && this.state.toggleValue !== ''){
      this.setState({imageData:this.state.originalData.filter((value)=>value.category === this.state.selectedOption.value && value.searchFor === this.state.toggleValue
        && value.price <= sliderValue,sliderValue)
      });
     }else if(this.state.selectedOption && this.state.selectedOption.value !== null && this.state.toggleValue === ''){
      this.setState({imageData:this.state.originalData.filter((value)=>value.category === this.state.selectedOption.value
        && value.price <= sliderValue,sliderValue)
      });
     }else if(this.state.selectedOption === null && this.state.toggleValue !== ''){
      this.setState({imageData:this.state.originalData.filter((value)=>value.searchFor === this.state.toggleValue
        && value.price <= sliderValue,sliderValue)
      });
     }else{
      this.setState({imageData:this.state.originalData.filter((value)=>value.price <= sliderValue,sliderValue) 
      });
     }
  };

  render() {
    return (
      <div className="App">
      <div className="header">
      <div className="container">
       <div className="row">
      <div className="col-lg-12 col-md-12 col-xs-12">
      <div className="selectDiv">
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.state.selectOptions}
        placeholder="Categories"
      />
      </div>
      <div className="toggleDiv">
      <IconButton title="Men" onClick={()=>this.selectToggleOption("Men")}> <Men /></IconButton >
      <IconButton title="Women" onClick={()=>this.selectToggleOption("Women")}><i className="material-icons"> face</i>
      </IconButton>
      <IconButton title="Kids" onClick={()=>this.selectToggleOption("Kids")}><i className="material-icons" >child_care</i></IconButton >
      <IconButton title="Elderly" onClick={()=>this.selectToggleOption("Elderly")}> <i className="material-icons">account_circle</i></IconButton >
      <IconButton title="Friends" onClick={()=>this.selectToggleOption("Friends")}> <i className="material-icons">supervisor_account</i></IconButton >
      </div>
      <div className="priceSlider">
      <Slider
      value={this.state.sliderValue} 
      onChange={this.sliderChange}
      step={6}
      min={1}
      max={10000}
      title={this.state.sliderValue}></Slider>
        </div>
      </div>
      </div>
      </div>
        </div>
      <div className="container">
       <div className="row">
       
        <div className="col-lg-12 col-md-12 col-xs-12">
       {
        this.state.imageData.length? this.state.imageData.map((value) => {
          return  this.state.imageHovered && this.state.imageHoveredData !== '' && this.state.imageHoveredData.id ===value.id?<Createimage imageClick={this.onImageClick} imageHover={this.onImageHover}
           src={value.imagePath} alt={value.name} imageHoverLeave={this.onImageLeave} dataValue={value} key={value.id} hovered={true}/>:
           <Createimage imageClick={this.onImageClick} imageHover={this.onImageHover} imageHoverLeave={this.onImageLeave}
           src={value.imagePath} alt={value.name} dataValue={value} key={value.id} hovered={false}/>
        }):<div>No Filter Results Found</div>
      }
      </div>
       </div>
       </div>
       <a href="https://www.amazon.in/" ref="hrefRef" rel="noopener noreferrer" target="_blank" style={{display:'none'}}>Visit W3Schools.com!</a>
       </div>
    );
  }
}

export default App;
