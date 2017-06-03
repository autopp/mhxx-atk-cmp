import React, { Component } from 'react';
import InputState from './InputState';
import WeaponRow from './WeaponRow';
import SectionRow from './SectionRow';
import NumberInputRow from './NumberInputRow';
import RadioInputRow from './RadioInputRow';
import ResultRow from './ResultRow';
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
  setSync = (item, value) => {
    let state = this.state;
    let sync = state.sync;
    sync[item] = value;
    let updated = { sync: sync };
    if (value === true) {
      let right = state.right;
      right[item] = state.left[item];
      updated.right = right;
    }
    this.setState(updated);
  }

  syncAll = () => {
    let newSyncs = {};
    Object.keys(this.state.sync).forEach((key) => { newSyncs[key] = true; });
    this.setState({ sync: newSyncs });
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
        <NumberInputRow labelText="武器会心率" item="weaponCrit" state={this.state} setSync={this.setSync}
            inputProps={{ min: -100, max: 100, step: 5, onChange: this.setForm }} />
        <RadioInputRow labelText="斬れ味" item="sharpness" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.sharpnesses, onChange: this.setForm }} />
        <SectionRow text="アイテム・食事" />
        <RadioInputRow labelText="護符・爪" item="possessedItem" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.possessedItems, onChange: this.setForm }} />
        <RadioInputRow labelText="鬼人薬" item="permanentItem" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.permanentItems, onChange: this.setForm }} />
        <RadioInputRow labelText="種・丸薬" item="temporaryItem" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.temporaryItems, onChange: this.setForm }} />
        <RadioInputRow labelText="食事" item="food" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.foods, onChange: this.setForm }} />
        <SectionRow text="スキル" />
        <RadioInputRow labelText="攻撃力UP" item="atkUp" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.atkUps, onChange: this.setForm }} />
        <RadioInputRow labelText="見切り" item="critUp" state={this.state} setSync={this.setSync}
          inputProps={{ items: InputState.critUps, onChange: this.setForm }} />
        <ResultRow leftResult={this.state.left.calcExpectedAtk()} rightResult={this.state.right.calcExpectedAtk()} onClick={this.syncAll} />
      </div>
    );
  }
}

export default App;
