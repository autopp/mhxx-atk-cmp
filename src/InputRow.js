import React, { Component } from 'react';

class InputRow extends Component {
  render() {
    let inputClass = this.getInputClass();
    let item = this.props.item;
    return (
      <div className="row inputRow">
        <div className={InputRow.labelColClass}>
          <p>{this.props.labelText}</p>
        </div>
        <div className={InputRow.inputColClass}>
          {React.createElement(inputClass, Object.assign({ pos: 'left', item: item, value: this.props.state.left[item] }, this.props.inputProps))}
        </div>
        <div className={InputRow.syncColClass}>
          <SyncInputs item={item} synced={this.props.state.sync[item]} onChange={this.props.setSync} />
        </div>
        <div className={InputRow.inputColClass}>
          {React.createElement(inputClass, Object.assign({ pos: 'right', item: item, value: this.props.state.right[item] }, this.props.inputProps))}
        </div>
      </div>
    );
  }
}

InputRow.labelColClass="col-lg-2";
InputRow.inputColClass="col-lg-4 center";
InputRow.syncColClass="col-lg-2 center";


export default InputRow;
