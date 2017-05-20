import React, { Component } from 'react';

class WeaponRow extends Component {
  createRadioButton = (weapon, idx) => {
    return (
      <label key={idx} className="radioButton">
        <input type="radio" name={this.props.item} value={weapon.value} checked={this.props.value === weapon.value} onChange={this.onChange}></input>{weapon.text}
      </label>
    );
  }
  onChange = e => this.props.onChange(e.target.value);
  render() {
    let radioButtons = this.props.weapons.map(this.createRadioButton);
    return (
      <div className="row inputRow">
        <div className="col-lg-12 center">
          {radioButtons}
        </div>
      </div>
    );
  }
}

export default WeaponRow;
