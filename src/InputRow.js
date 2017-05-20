import React, { Component } from 'react';

class InputRow extends Component {
  render() {
    let inputClass = this.getInputClass();
    return (
      <div className="row inputRow">
        <div className={InputRow.labelColClass}>
          <p>{this.props.labelText}</p>
        </div>
        <div className={InputRow.inputColClass}>
          {React.createElement(inputClass, Object.assign({ pos: 'right' }, this.props.inputProps))}
        </div>
        <div className={InputRow.syncColClass}>
          <SyncInputs item={this.props.item} synced={this.props.state.sync[this.props.item]} onChange={this.props.setSync} />
        </div>
        <div className={InputRow.inputColClass}>
          {React.createElement(inputClass, Object.assign({ pos: 'right' }, this.props.inputProps))}
        </div>
      </div>
    );
  }
}

InputRow.labelColClass="col-lg-2";
InputRow.inputColClass="col-lg-4 center";
InputRow.syncColClass="col-lg-2 center";


export default InputRow;
