import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.name = this.props.name ? this.props.name : 'Darth Vader';
    this.img = this.props.img ? this.props.img : 'http://localhost:3008/darth_vader.jpg';
    this.birthday = this.props.birthday ? this.props.birthday : '41.9BBY';
    this.homePlanet = this.props.homePlanet ? this.props.homePlanet : 'Tatooine';
  }
  render() {
    return (
      <div className='card'>
        <div className='card-content'>
          	<div className='card-name'>{this.name}</div>
          	<img src={this.img} alt='profile'/>
            <p>
                <span>Birthday:</span>
                <span>{this.birthday}</span>
            </p>
            <p>
                {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
                <span>Homeworld:</span>
                <span>{this.homePlanet}</span>
            </p>
        </div>
    </div>

    );
  }
}

export default Card;
