import React, { Component } from 'react';
import InputState from './InputState';
import WeaponRow from './WeaponRow';
import SectionRow from './SectionRow';
import NumberInputRow from './NumberInputRow';
import './App.css';

class App extends Component {
  weapons = [
    { value: 'greatSword', factor: {}, text: '大剣' },
    { value: 'longSword', factor: {}, text: '太刀' },
    { value: 'swordAndShield', factor: {}, text: '片手剣' },
    { value: 'dualSword', factor: {}, text: '双剣' },
    { value: 'hammer', factor: {}, text: 'ハンマー' },
    { value: 'huntingHorn', factor: {}, text: '狩猟笛' },
    { value: 'Lance', factor: {}, text: 'ランス' },
    { value: 'gunlance', factor: {}, text: 'ガンランス' },
    { value: 'switchAxe', factor: {}, text: 'スラッシュアックス' },
    { value: 'chargeBlade', factor: {}, text: 'チャージアックス' },
    { value: 'insectGlaive', factor: {}, text: '操虫棍' }
  ]
  constructor(props) {
    super(props);

    let sync = {};
    InputState.stateKeys.forEach(key => sync[key] = false);

    this.state = {
      weapon: 'greatSword',
      left: new InputState({}), right: new InputState({}),
      sync: sync
    };
  }
  setWeapon = (weapon) => this.setState({ weapon: weapon })
  setForm = (pos, item, value) => {
    if (this.state.sync[item]) {
      let { left, right } = this.this.state;
      left[item] = right[item] = value;
      this.setState({ left: left, right: right });
    } else {
      let state = this.state[pos];
      state[item] = value;
      this.setState({ [pos]: state });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>MHXX Atack Comparator</h1>
          </div>
        </div>
        <SectionRow text="武器" />
        <WeaponRow item="weapon" weapons={this.weapons} value={this.state.weapon} onChange={this.setWeapon} />
        <NumberInputRow labelText="武器攻撃力" item="weaponAtk" state={this.state} setSync={this.setSync}
          inputProps={{ min: 0, max: 1000, step: 10, onChange: this.setForm }} />
      </div>
    );
  }
}

export default App;
