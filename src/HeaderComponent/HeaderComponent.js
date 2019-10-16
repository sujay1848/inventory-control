import React, { Component } from 'react';
import './HeaderComponent.css'

class HeaderComponent extends Component {
    HeaderComponent(){}

    render() {
        return <h3 className='HeaderComp'> Header at {this.getTime()} </h3>;
    }

    getTime() {
        return new Date().toDateString();
    }
}
export default HeaderComponent;