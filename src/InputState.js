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

  calcExpectedAtk() {
    let baseAtk = this.calcAtack();
    let crit = this.calcCrit();
    let critFactor = this.calcCritFactor(crit);
    let sharpnessFactor = this.calcSharpnessFactor();
    return (baseAtk) * (100 + crit * critFactor) / 100 * sharpnessFactor / 10000;
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

InputState.weapons = [
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
];

InputState.sharpnesses = [
  { value: 'purple', factor: { normal: 139, blunt: 100 }, text: '紫 (1.39)' },
  { value: 'white', factor: { normal: 132, blunt: 100 }, text: '白 (1.32)' },
  { value: 'blue', factor: { normal: 120, blunt: 100 }, text: '青 (1.2)' },
  { value: 'green', factor: { normal: 105, blunt: 110 }, text: '緑 (1.05)' },
  { value: 'yellow', factor: { normal: 100, blunt: 115 }, text: '黄 (1.0)' },
  { value: 'orange', factor: { normal: 75, blunt: 120 }, text: '橙 (0.75)' },
  { value: 'red', factor: { normal: 50, blunt: 120 }, text: '赤 (0.5)' }
];

InputState.possessedItems = [
  { value: 'both', factor: 15, text: '爪・護符 (+15)' },
  { value: 'claw', factor: 9, text: '爪のみ (+9)' },
  { value: 'amulet', factor: 6, text: '護符のみ (+6)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.permanentItems = [
  { value: 'great', factor: 7, text: '鬼人薬グレート (+7)' },
  { value: 'normal', factor: 5, text: '鬼人薬 (+5)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.temporaryItems = [
  { value: 'pill', factor: 25, text: '怪力の丸薬 (+25)' },
  { value: 'seed', factor: 10, text: '怪力の種 (+10)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.foods = [
  { value: 'large', factor: 7, text: '攻撃力【大】 (+7)' },
  { value: 'medium', factor: 5, text: '攻撃力【中】 (+5)' },
  { value: 'small', factor: 3, text: '攻撃力【小】 (+3)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.atkUps = [
  { value: 'large', factor: 20, text: '攻撃力UP【大】 (+20)' },
  { value: 'medium', factor: 15, text: '攻撃力UP【中】 (+15)' },
  { value: 'small', factor: 10, text: '攻撃力UP【小】 (+10)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.critUps = [
  { value: 'up3', factor: 30, text: '見切り+3 (+30)' },
  { value: 'up2', factor: 20, text: '見切り+2 (+20)' },
  { value: 'up1', factor: 10, text: '見切り+1 (+10)' },
  { value: 'none', factor: 0, text: 'なし (+0)' },
  { value: 'down1', factor: -5, text: '見切り-1 (-5)' },
  { value: 'down2', factor: -10, text: '見切り-2 (-10)' },
  { value: 'down3', factor: -15, text: '見切り-3 (-15)' }
];

InputState.leftArmSkills = [
  { value: 'challenger2', factor: { atk: 20, crit: 15 }, text: '挑戦者2 (攻撃+20, 会心+15)' },
  { value: 'challenger1', factor: { atk: 10, crit: 10 }, text: '挑戦者1 (攻撃+10, 会心+10)' },
  { value: 'fullCharge', factor: { atk: 20, crit: 0 }, text: 'フルチャージ (攻撃+20)' },
  { value: 'latentPower2', factor: { atk: 0, crit: 50 }, text: '力の解放2 (会心+50)' },
  { value: 'latentPower1', factor: { atk: 0, crit: 30 }, text: '力の解放1 (会心+30)' },
  { value: 'none', factor: { atk: 0, crit: 0 }, text: 'なし (+0)' }
];

InputState.chainCrits = [
  { value: 'up30', factor: 30, text: '4 hits (+30)' },
  { value: 'up25', factor: 25, text: '1 hit (+25)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.climateAdaptions = [
  { value: 'climateAndDrink', factor: 20, text: '北風・クーラードリンク (+20)' },
  { value: 'climate', factor: 15, text: '北風/南風 (+15)' },
  { value: 'drink', factor: 5, text: 'クーラードリンク (+5)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

InputState.fortifies = [
  { value: 'two', factor: 1.2, text: '2回 (1.2)' },
  { value: 'one', factor: 1.1, text: '1回 (1.1)' },
  { value: 'none', factor: 1.0, text: 'なし (1.0)' }
];

InputState.wideExtracts = [
  { value: 'redWhite', factor: { atk: 5, crit: 10 }, text: '赤白 (攻撃+5, 会心+10)' },
  { value: 'red', factor: { atk: 5, crit: 0 }, text: '赤 (攻撃+5)' },
  { value: 'white', factor: { atk: 0, crit: 10 }, text: '白 (会心+10)' },
  { value: 'none', factor: { atk: 0, crit: 0 }, text: 'なし (+0)' }
];

InputState.frenzies = [
  { value: 'antivirus', factor: 30, text: '無我の境地 (+30)' },
  { value: 'recovered', factor: 15, text: '克服 (+15)' },
  { value: 'none', factor: 0, text: 'なし (+0)' }
];

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
