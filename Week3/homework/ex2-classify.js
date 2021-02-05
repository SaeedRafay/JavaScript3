class Human {
    constructor(name, gender, age, residence, spouse, kids, job, work, food, smoke) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.residence = residence;
        this.spouse = spouse;
        this.kids = kids;
        this.job = job;
        this.work = work;
        this.food = food;
        this.smoke = smoke;

        console.log(`${this.name} is a ${this.age} year old ${this.gender}, that lives in ${this.residence}. He has a ${this.spouse} and ${this.kids} children. As a day job he's a ${this.job}, that ${this.work}. He likes to eat ${this.food} and ${this.smoke}.`);
    }

    makes() {
        console.log(`${this.name} ${this.work} as a ${this.job}.`);
    }

    consumes() {
        console.log(`${this.name} eats ${this.food} and ${this.smoke}.`);
    }
}

class Animal {
    constructor(type, name, age, color, food, work, owner) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.color = color;
        this.food = food;
        this.work = work;
        this.owner = owner;

        console.log(`${this.owner.name} has a ${this.type}, named ${this.name}. The ${this.type} is ${this.age} years old and has the color ${this.color}. Usually the ${this.type} eats ${this.food} or ${this.work} for ${this.owner.name}.`);
    }

    helps() {
        console.log(`${this.name} ${this.work} for ${this.owner.name}.`);
    }

    eats() {
        console.log(`${this.name} eats ${this.food}.`);
    }
}

const abdulKareem = new Human("Abdulkareem", "man", "35", "Riyadh", "wife", 3, "construction worker", "makes houses", "dates", "smoke water pipe");
const adel = new Animal("horse", "Adel", 15, "brown", "grass", "helps transport materials", abdulKareem);

abdulKareem.makes();
abdulKareem.consumes();

adel.helps();
adel.eats();
