class InputState {
  constructor(obj) {
    this.weaponAtk = 300;
    this.weaponCrit = 0;
    this.sharpness = 'purple';

    this.possessedItem = 'both';
    this.permanentItem = 'none';
    this.temporaryItem = 'none';
    this.food = 'none';

    this.atkUp = 'none';
    this.critUp = 'none';
    this.leftArmSkill = 'none';

    this.weakness = false;
    this.superCrit = false;
    this.reversedCrit = false;
    this.chainCrit = 'none';

    this.climateAdaption = 'none';
    this.blunt = false;
    this.resentment = false;
    this.resuscitate = false;

    this.fortify = 'none';
    this.adrenaline = false;
    this.wideExtract = 'none';
    this.frenzy = 'none';

    for (let k in this) {
      let v = obj[k];
      if (typeof(v) !== 'undefined') {
        this[k] = v;
      }
    }
  }
}

export default InputState;
