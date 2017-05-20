import React, { Component } from 'react';
import WeaponRow from './WeaponRow'
import './App.css'

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
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>MHXX Atack Comparator</h1>
          </div>
        </div>
        <WeaponRow item="weapon" weapons={this.weapons} value="greatSword" onChange={null} />
      </div>
    );
  }
}

export default App;
