import React, { Component } from 'react';

class SyncInput extends Component {
  onClick = e => this.props.onChange(this.props.item, !this.props.synced)
  render() {
    let [style, text] = this.props.synced ? ['btn-info', 'Synced'] : ['btn-default', 'Unsynced'];
    let className = `btn ${style} btn-xs sync-button`;
    return (
      <button type="button" className={className} onClick={this.onClick}>{text}</button>
    );
  }
}

export default SyncInput;
