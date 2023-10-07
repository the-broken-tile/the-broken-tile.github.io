function Potions({count, damage}) {
    let thisCount = count;
    let thisDamage = damage;

    this.craft = () => thisCount = Math.min(thisCount + 1, Potions.MAX);
    this.getCount = () => thisCount;
    this.getDamage = () => thisDamage;
    this.canTakeDamage = () => thisCount * 2 > thisDamage;
    this.tageDamage = () => thisDamage++;
}
Potions.MAX = 12;
