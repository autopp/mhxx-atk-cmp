import React, { Component } from 'react';

class SectionRow extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-6"><h3>{this.props.text}</h3></div>
      </div>
    );
  }
}

export default SectionRow;
