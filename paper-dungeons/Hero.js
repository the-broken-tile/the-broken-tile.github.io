function Hero(name, level, trainingStyle) {
    let thisLevel = level;
    let thisName = name;
    let thisTrainingStyle = trainingStyle;

    this.getLevel = () => thisLevel;
    this.getName = () => thisName;
    this.getTrainingStyle = () => thisTrainingStyle;
    this.updateTrainingStyle = newTrainingStyle => thisTrainingStyle = newTrainingStyle;
    this.levelUp = () => {
        thisLevel = Math.min(thisLevel + 1, Hero.MAX_LEVEL);
    };
}

Hero.MAX_LEVEL = 6;