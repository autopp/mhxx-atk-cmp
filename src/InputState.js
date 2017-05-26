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

  calcAtack() {
    return (
      this.weaponAtk + this.findFactor('possessedItems', this.possessedItem) +
      this.findFactor('permanentItems', this.permanentItem) +
      this.findFactor('temporaryItems', this.temporaryItem) +
      this.findFactor('foods', this.food) + this.findFactor('atkUps', this.atkUp) +
      this.findFactor('leftArmSkills', this.leftArmSkill).atk +
      this.findFactor('climateAdaptions', this.climateAdaption) +
      (this.resentment ? 20 : 0) + (this.resuscitate ? 20 : 0) +
      this.findFactor('wideExtracts', this.wideExtract).atk
    ) * this.findFactor('fortifies', this.fortify) * (this.adrenaline ? 1.3 : 1);
  }

  calcCrit() {
    let crit = this.weaponCrit + this.findFactor('critUps', this.critUp) +
      this.findFactor('leftArmSkills', this.leftArmSkill).crit + (this.weakness ? 50 : 0) +
      this.findFactor('chainCrits', this.chainCrit) +
      this.findFactor('wideExtracts', this.wideExtract).crit +
      this.findFactor('frenzies', this.frenzy);
    return Math.min(Math.max(crit, -100), 100);
  }

  calcCritFactor(crit) {
    if (crit >= 0) {
      return this.superCrit ? 0.4 : 0.25;
    } else {
      return this.reversedCrit ? -1 / 8 : 0.25;
    }
  }

  calcSharpnessFactor() {
    let factor = this.findFactor('sharpnesses', this.sharpness);
    if (this.blunt) {
      return factor.normal * factor.blunt;
    } else {
      return factor.normal * 100;
    }
  }

  findFactor(item, value) {
    let obj = InputState[item].find((x) => x.value === value)
    return obj ? obj.factor : undefined;
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

InputState.stateKeys = Object.keys(InputState.defaultState);
InputState.stateTypes = (() => {
  let types = {};
  for (let key in InputState.defaultState) {
    types[key] = typeof(InputState.defaultState[key]);
  }
  return types;
})();

export default InputState;
