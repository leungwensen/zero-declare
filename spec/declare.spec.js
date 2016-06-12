const expect = chai.expect;
const declare = require('../lib');

describe('zero-declare', () => {
  const Pig = declare('Pig', [], {
    name: 'pig',
    constructor(name) {
      this.name = name;
    },
    talk() {
      const line = `I am a ${this.name}`;
      return line;
    }
  });
  const ColoredPig = declare('ColoredPig', Pig, {
    color: 'red',
    constructor(name, color) {
      Pig.prototype.constructor.call(this, name);
      if (color) {
        this.color = color;
      }
    },
    showColor() {
      const line = `My color is ${this.color}`;
      return line;
    }
  });

  it('three arguments', () => {
    const pig = new Pig('normal pig');
    expect(pig.talk()).to.equal('I am a normal pig');
  });
  it('three arguments while the second one is no an Array', () => {
    const redPig = new ColoredPig('red pig');
    expect(redPig.talk()).to.equal('I am a red pig');
    expect(redPig.color).to.equal('red');
    expect(redPig.showColor()).to.equal('My color is red');

    const yellowPig = new ColoredPig('yellow pig', 'yellow');
    expect(yellowPig.talk()).to.equal('I am a yellow pig');
    expect(yellowPig.color).to.equal('yellow');
    expect(yellowPig.showColor()).to.equal('My color is yellow');
  });

  const Dog = declare({
    name: 'dog',
    sound: 'woof',
    bark() {
      const sound = this.sound;
      const barking = `${[sound, sound, sound].join(', ')}!`;
      return barking;
    }
  });
  const Husky = declare(Dog, {
    name: 'husky',
    sound: 'arf'
  });

  it('one argument', () => {
    const puppy = new Dog();
    expect(puppy.name).to.equal('dog');
    expect(puppy.bark()).to.equal('woof, woof, woof!');
  });
  it('two arguments', () => {
    const puppy = new Husky();
    expect(puppy.name).to.equal('husky');
    expect(puppy.bark()).to.equal('arf, arf, arf!');
  });

  it('declare("Max",[Programmer, Sportsman])', () => {
    const Human = declare('Human');
    Human.prototype.walk = () => true;
    Human.prototype.say = () => 'Wo-wo-wo!!!';

    const Man = declare('Man', [Human]);
    Man.prototype.isMan = true;
    Man.prototype.say = () => 'I am a man!!!';

    const Sportsman = declare('Sportsman', [Human]);
    Sportsman.prototype.run = () => true;

    const Programmer = declare('Programmer', [Human]);
    Programmer.prototype.typing = () => true;
    Programmer.prototype.isMan = false; // !!!NOTICE!!!: 继承链数组中越靠前越优先

    const Max = declare('Maksim', [Man, Sportsman, Programmer]);
    const max = new Max();

    expect(max.isMan).to.equal(true);
    expect(max.say()).to.equal('I am a man!!!');

    expect(max).to.have.property('run');
    expect(max).to.have.property('typing');
  });
});
