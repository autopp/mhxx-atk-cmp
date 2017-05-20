import React, { Component } from 'react';
import InputState from './InputState';
import WeaponRow from './WeaponRow';
import SectionRow from './SectionRow';
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
  setWeapon = (weapon) => this.setState({ weapon: weapon })
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
      </div>
    );
  }
}

export default App;
