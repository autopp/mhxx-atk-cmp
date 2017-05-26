import React, { Component } from 'react';
import Result from './Result';
import InputRow from './InputRow';

class ResultRow extends Component {
  render() {
    return (
      <div className="row resultRow">
        <div className={InputRow.labelColClass}>
          <p>計算結果</p>
        </div>
        <div className={InputRow.inputColClass}>
          <Result result={this.props.leftResult} />
        </div>
        <div className={InputRow.syncColClass}>
          <button type="button" className="btn btn-success btn-xs" onClick={this.props.onClick}>Sync all</button>
        </div>
        <div className={InputRow.inputColClass}>
          <Result result={this.props.rightResult} />
        </div>
      </div>
    );
  }
}

export default ResultRow;
