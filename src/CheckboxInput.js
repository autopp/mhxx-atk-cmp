import React, { Component } from 'react';

class CheckboxInput extends Component {
  onChange = e => {
    this.props.onChange(this.props.pos, this.props.item, e.target.checked);
  }

  render() {
    return <input type="checkbox" data-item={this.props.item} onChange={this.onChange} checked={this.props.value} />;
  }
}

export default CheckboxInput;
