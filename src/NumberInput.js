import React, { Component } from 'react';

class NumberInput extends Component {
  onChange = e => {
    this.props.onChange(this.props.pos, this.props.item, parseInt(e.target.value, 10));
  }

  render() {
    return <input type="number" value={this.props.value} min={this.props.min} max={this.props.max} step={this.props.step} onChange={this.onChange} />
  }
}

export default NumberInput;
