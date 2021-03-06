import React, { Component } from 'react';
import InputState from './InputState';
import WeaponRow from './WeaponRow';
import SectionRow from './SectionRow';
import NumberInputRow from './NumberInputRow';
import RadioInputRow from './RadioInputRow';
import CheckboxInputRow from './CheckboxInputRow';
import ResultRow from './ResultRow';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    let sync = {};
    InputState.stateKeys.forEach(key => sync[key] = false);
    let { weapon, left, right } = this.parseQuery(location.search.substring(1));
    this.state = {
      weapon: weapon || 'greatSword',
      left: new InputState(left), right: new InputState(right),
      sync: sync
    };
  }

  parseQuery = (qry) => {
    let state = { weapon: undefined, left: {}, right: {} };
    let types = InputState.stateTypes;

    qry.split('&').forEach((kv) => {
      let [k, v] = kv.split('=');

      if (k === 'weapon') {
        if (InputState.weapons.find(w => w.value === v)) {
          state.weapon = v;
        }
        return;
      }

      let matched = /^(left|right)_(.+)$/.exec(k);
      if (!matched) {
        return;
      }

      let [ _all, pos, item ] = matched;
      let value = this.convertParameter(types[item], v);
      if (value !== undefined) {
        state[pos][item] = value;
      }
    });

    return state;
  }

  convertParameter = (type, value) => {
    switch (type) {
      case 'boolean':
        return value === 'true' ? true : (value === 'false' ? false : undefined);
      case 'number':
        return parseInt(value, 10);
      case 'string':
        return value;
      default:
        return undefined;
    }
  }

  setWeapon = (weapon) => this.setState({ weapon: weapon })

  setForm = (pos, item, value) => {
    if (this.state.sync[item]) {
      let { left, right } = this.state;
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

  genQuery = () => {
    let ary = [`weapon=${encodeURIComponent(this.state.weapon)}`];
    ['left', 'right'].forEach(pos => {
      for (let item in this.state[pos]) {
        if (!InputState.stateKeys.includes(item)) {
          continue;
        }
        ary.push(`${pos}_${item}=${encodeURIComponent(this.state[pos][item])}`);
      }
    });
    return `?${ary.join('&')}`
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
        <WeaponRow item="weapon" weapons={InputState.weapons} value={this.state.weapon} onChange={this.setWeapon} />
        <NumberInputRow labelText="武器攻撃力" item="weaponAtk" state={this.state} setSync={this.setSync} inputProps={{ min: 0, max: 1000, step: 10, onChange: this.setForm }} />
        <NumberInputRow labelText="武器会心率" item="weaponCrit" state={this.state} setSync={this.setSync} inputProps={{ min: -100, max: 100, step: 5, onChange: this.setForm }} />
        <RadioInputRow labelText="斬れ味" item="sharpness" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.sharpnesses, onChange: this.setForm }} />
        <SectionRow text="アイテム・食事" />
        <RadioInputRow labelText="護符・爪" item="possessedItem" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.possessedItems, onChange: this.setForm }} />
        <RadioInputRow labelText="鬼人薬" item="permanentItem" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.permanentItems, onChange: this.setForm }} />
        <RadioInputRow labelText="種・丸薬" item="temporaryItem" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.temporaryItems, onChange: this.setForm }} />
        <RadioInputRow labelText="食事" item="food" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.foods, onChange: this.setForm }} />
        <SectionRow text="スキル" />
        <RadioInputRow labelText="攻撃力UP" item="atkUp" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.atkUps, onChange: this.setForm }} />
        <RadioInputRow labelText="見切り" item="critUp" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.critUps, onChange: this.setForm }} />
        <RadioInputRow labelText="挑戦者/フルチャージ/力の解放" item="leftArmSkill" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.leftArmSkills, onChange: this.setForm }} />
        <CheckboxInputRow labelText="弱点特効" item="weakness" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <CheckboxInputRow labelText="超会心" item="superCrit" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <CheckboxInputRow labelText="痛恨会心" item="reversedCrit" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <RadioInputRow labelText="連撃の心得" item="chainCrit" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.chainCrits, onChange: this.setForm }} />
        <RadioInputRow labelText="北風の狩人/南風の狩人" item="climateAdaption" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.climateAdaptions, onChange: this.setForm }} />
        <CheckboxInputRow labelText="鈍器使い" item="blunt" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <CheckboxInputRow labelText="逆恨み" item="resentment" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <CheckboxInputRow labelText="死中に活" item="resuscitate" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <RadioInputRow labelText="不屈" item="fortify" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.fortifies, onChange: this.setForm }} />
        <CheckboxInputRow labelText="火事場力+2" item="adrenaline" state={this.state} setSync={this.setSync} inputProps={{ onChange: this.setForm }} />
        <RadioInputRow labelText="エキス広域化" item="wideExtract" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.wideExtracts, onChange: this.setForm }} />
        <RadioInputRow labelText="狂竜症" item="frenzy" state={this.state} setSync={this.setSync} inputProps={{ items: InputState.frenzies, onChange: this.setForm }} />
        <ResultRow leftResult={this.state.left.calcExpectedAtk()} rightResult={this.state.right.calcExpectedAtk()} onClick={this.syncAll} />
      </div>
    );
  }

  componentDidUpdate(_prevProps, _prevState) {
    let qry = this.genQuery();
    history.replaceState('', '', qry);
  }
}

export default App;
