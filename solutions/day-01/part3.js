// 11 & 12 (Functional programming & Classes)
// 1

const products = [
  { product: "banana", price: 3 },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: 8 },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

products.forEach(({ price }) => console.log(price));

// 2
products.forEach(({ product, price }) =>
  console.log(
    `The price of ${product} is ${
      typeof price == "number" ? price + " euros." : "unknown."
    } `
  )
);

// 3
let sum = 0;
products.forEach(({ price }) => {
  sum += typeof price == "number" ? price : 0;
});

// 4
let prices = products.map(({ price }) => price);
console.log(prices);

// 5
const productsWithPrices = products.filter(
  ({ price }) => typeof price == "number"
);

// 6
console.log(
  productsWithPrices.map(({ price }) => price).reduce((sum, curr) => sum + curr)
);

// 7
console.log(
  products.reduce(
    (sum, { price }) => sum + (typeof price == "number" ? price : 0),
    0
  )
);

// 8
const firstProductWithoutPrice = products.find(
  ({ price }) => typeof price != "number"
);

// 9
const indexOfFirstProductWithoutPrice = products.findIndex(
  ({ price }) => typeof price != "number"
);

// 10
const someProductHasNoPrice = products.some(
  ({ price }) => typeof price != "number"
);

// 11
const allProductsHavePrice = products.every(
  ({ price }) => typeof price == "number"
);

// 12
// forEach is used to iterate each element of array
// map is used to transform an array to another expected structure
// filter is used to filter out some elements from an array given the condition
// reduce is used to iterate on each element with an initial value, generally for addition, multiply and concatenation.

// 12. Classes
// 1
class Animal {
  constructor(name, age, color, legs) {
    this.name = name;
    this.age = age;
    this.color = color;
    this.legs = legs;
  }
  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  getDescription() {
    return `My name is ${name}, I'm ${age} years old. I'm ${color}. I have ${legs} legs`;
  }
}
// 2
class Dog extends Animal {
  constructor(name, age, color, legs) {
    super(name, age, color, legs);
  }
}
class Cat extends Animal {
  constructor(name, age, color, legs, isVaccined) {
    super(name, age, color, legs);
    this.isVaccined = isVaccined;
  }
  getDescription() {
    return `My name is ${name}, I'm ${age} years old. I'm ${color}. I have ${legs} legs. ${
      this.isVaccined ? "I'm vaccined." : "I'm not vaccined yet"
    }`;
  }
}

// Level 3
const AGES = [
  31,
  26,
  34,
  37,
  27,
  26,
  32,
  32,
  26,
  27,
  27,
  24,
  32,
  33,
  27,
  25,
  26,
  38,
  37,
  31,
  34,
  24,
  33,
  29,
  26,
];
class Statistical {
  constructor(ages) {
    this.ages = ages;
  }
  count() {
    return this.ages.length;
  }
  sum() {
    return this.ages.reduce((sum, curr) => sum + curr);
  }

  min() {
    return this.ages.reduce((prev, curr) => (prev < curr ? prev : curr));
  }

  max() {
    return this.ages.reduce((prev, curr) => (prev > curr ? prev : curr));
  }

  range() {
    return this.max() - this.min();
  }

  mean() {
    return Math.round(this.sum() / this.count());
  }

  median() {
    const sortedAges = this.ages.sort();
    const count = this.count();
    const countIsEven = count % 2 == 0;
    return countIsEven
      ? sortedAges.slice(count / 2 - 1, 2)
      : sortedAges[Math.floor(count / 2)];
  }

  mode() {
    const singles = [...new Set(this.ages)];
    const repeatedAges = singles.filter(
      (value) => this.ages.indexOf(value) != this.ages.lastIndexOf(value)
    );
    let modeCandidates = []; // {mode: count:}
    for (let age of repeatedAges) {
      let count = 0;
      for (let value of this.ages) {
        if (age == value) count++;
      }
      modeCandidates.push({ mode: age, count });
    }
    return modeCandidates.reduce((max, curr) =>
      max.count > curr.count ? max : curr
    );
  }

  var() {
    const squaredDifferences = this.ages.map(
      (value) => (value - this.mean()) * (value - this.mean())
    );
    const sumOfSquaredDifferences = squaredDifferences.reduce(
      (sum, curr) => sum + curr
    );

    return sumOfSquaredDifferences / this.count();
  }

  std() {
    return Math.round(Math.sqrt(this.var()) * 10) / 10;
  }

  freqDist() {
    // classes, frequency, midpoint
    const numClasses = 11;
    const classWidth = Math.ceil(this.range() / numClasses);
    let classes = [];
    const MIN = this.min();
    let freDistribution = [];

    for (let i = 1; i <= numClasses; i++) {
      classes.push(MIN + classWidth * i);
    }
    let formatedClasses = [[this.min(), classes[0] - 1]];
    for (let i = 0; i < classes.length; i++) {
      if (i < classes.length - 1) {
        formatedClasses.push([classes[i], classes[i + 1] - 1]);
      }
    }

    for (let [base, ceil] of formatedClasses) {
      let count = 0;
      for (let age of this.ages) {
        if (age <= ceil && age >= base) {
          count++;
        }
      }
      freDistribution.push([[base, ceil], count]);
    }
    return freDistribution;
  }

  describe() {
    console.log(`
    Count: ${this.count()}
    Sum: ${this.sum()}
    Min: ${this.min()}
    Max: ${this.max()}
    Range: ${this.range()}
    Mean: ${this.mean()}
    Median: ${this.median()}
    Mode: ${this.mode()}
    Variance: ${this.var()}
    Standard Deviation: ${this.std()}
    Frequency Distribution: ${this.freqDist()}
    `);
  }
}

const ageStatistic = new Statistical(AGES);
ageStatistic.describe();
