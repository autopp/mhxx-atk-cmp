import React, { Component } from 'react';

class RadioInput extends Component {
  onChange = e => {
    this.props.onChange(this.props.pos, this.props.item, e.target.value);
  }

  render() {
    let items = this.props.items.map((item, idx) => {
      return (
        <label key={idx} className="radioButton">
          <input type="radio" name={`${this.props.pos}.${this.props.item}`} value={item.value} checked={this.props.value === item.value} onChange={this.onChange}></input>{item.text}
        </label>
      );
    });

    return <div>{items}</div>
  }
}

export default RadioInput;
