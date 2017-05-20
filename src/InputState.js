class InputState {
  constructor(obj) {
    Object.assign(this, InputState.defaultState);
    for (let k in this) {
      let v = obj[k];
      if (typeof(v) !== 'undefined') {
        this[k] = v;
      }
    }
  }
}

InputState.defaultState = {
  weaponAtk: 300, weaponCrit: 0, sharpness: 'purple',
  possessedItem: 'both', permanentItem: 'none', temporaryItem: 'none', food: 'none',
  atkUp: 'none', critUp: 'none', leftArmSkill: 'none',
  weakness: false, superCrit: false, reversedCrit: false, chainCrit: 'none',
  climateAdaption: 'none', blunt: false, resentment: false, resuscitate: false,
  fortify: 'none', adrenaline: false, wideExtract: 'none', frenzy: 'none'
};

export default InputState;
