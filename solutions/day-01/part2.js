/**
 * Solutions for 7 & 8
 */
// Level 3
//1
const personAccount = {
  firstName: "isabella",
  lastName: "HU",
  incomes: [
    { amount: 200, description: "salary from C**b" },
    { amount: 3000, description: "salary from w**d" },
  ],
  expenses: [{ amount: 15, description: "Apple Music" }],
  totalIncome: function () {
    return (
      this.incomes
        .map((income) => income.amount)
        .reduce((prev, curr) => prev + curr),
      0
    );
  },
  totalExpense: function () {
    return this.expenses
      .map((expense) => expense.amount)
      .reduce((prev, curr) => prev + curr, 0);
  },
  accountInfo: function () {
    return `Dear ${this.firstName} ${this.lastName}
    ${this.incomes.map(
      (income) => income.amount + "from " + income.description
    )}
    `;
  },
  addIncome: function (income) {
    this.incomes.push(income);
  },
  addExpense: function (expense) {
    this.expenses.push(expense);
  },
  accountBalance: function () {
    return this.totalIncome - this.totalExpense;
  },
};

// 2

var users = [
  {
    _id: "ab12ex",
    username: "Alex",
    email: "alex@alex.com",
    password: "123123",
    createdAt: "08/01/2020 9:00 AM",
    isLoggedIn: false,
  },
  {
    _id: "fg12cy",
    username: "Asab",
    email: "asab@asab.com",
    password: "123456",
    createdAt: "08/01/2020 9:30 AM",
    isLoggedIn: true,
  },
  {
    _id: "zwf8md",
    username: "Brook",
    email: "brook@brook.com",
    password: "123111",
    createdAt: "08/01/2020 9:45 AM",
    isLoggedIn: true,
  },
  {
    _id: "eefamr",
    username: "Martha",
    email: "martha@martha.com",
    password: "123222",
    createdAt: "08/01/2020 9:50 AM",
    isLoggedIn: false,
  },
  {
    _id: "ghderc",
    username: "Thomas",
    email: "thomas@thomas.com",
    password: "123333",
    createdAt: "08/01/2020 10:00 AM",
    isLoggedIn: false,
  },
];

var products = [
  {
    _id: "eedfcf",
    name: "mobile phone",
    description: "Huawei Honor",
    price: 200,
    ratings: [
      { userId: "fg12cy", rate: 5 },
      { userId: "zwf8md", rate: 4.5 },
    ],
    likes: [],
  },
  {
    _id: "aegfal",
    name: "Laptop",
    description: "MacPro: System Darwin",
    price: 2500,
    ratings: [],
    likes: ["fg12cy"],
  },
  {
    _id: "hedfcg",
    name: "TV",
    description: "Smart TV:Procaster",
    price: 400,
    ratings: [{ userId: "fg12cy", rate: 5 }],
    likes: ["fg12cy"],
  },
];
// a
const signUp = function (user) {
  const userIsExisted =
    users.map((user) => user.email).includes(user.email) ||
    users.map((user) => user.username).includes(user.username);
  if (userIsExisted) {
    alert("User exists already");
  } else {
    users.push(user);
  }
};

// b
const signIn = function (user) {
  const indexOfUser =
    users.map((user) => user.email).indexOf(user.email) ||
    users.map((user) => user.username).indexOf(user.username);
  users[indexOfUser].isLoggedIn = true;
};

// 3.a
const rateProduct = function (product, rating) {
  for (let item of products) {
    if (item["_id"] === product._id) {
      item.ratings.push(rating);
    }
  }
};
// 3.b
const averageRating = function () {
  const productRatings = products.map((product) => product.ratings);
  let totalRate = 0;
  let rateCount = 0;
  for (let ratings of productRatings) {
    totalRate += ratings
      .map((rating) => rating.rate)
      .reduce((prev, curr) => prev + curr, 0);
    rateCount += ratings.length;
  }
  return Math.round((totalRate / rateCount) * 10) / 10;
};
// 4
const likeProduct = function (product, user) {
  for (let item of products) {
    if (item._id === product._id) {
      if (item.likes.includes(user._id)) {
        // unlike
        item.likes.splice(item.likes.indexOf(user._id), 1);
      } else {
        item.likes.push(user._id);
      }
    }
  }
};

// 8. Functions
// Level 2
// 1
function solveQuadratic(a, b, c) {
  if (arguments.length !== 3) {
    return 0;
  } else {
    const root1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    const root2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    return root1 !== root2 ? `{${root1}, ${root2}}` : `{${root1}}`;
  }
}

console.log(solveQuadratic());
console.log(solveQuadratic(1, 4, 4));
console.log(solveQuadratic(1, -1, -2));
console.log(solveQuadratic(1, 7, 12));
console.log(solveQuadratic(1, 0, -4));
console.log(solveQuadratic(1, -1, 0));

// 2
function printArray(arr) {
  for (const value of arr) {
    console.log(value);
  }
}

// 3
const showDateTime = function () {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth().toString().padStart(2, "0");
  const date = now.getUTCDate().toString().padStart(2, "0");
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();

  console.log(`${date}/${month}/${year} ${hour}:${minute}`);
};

// 4
const swapValues = function (a, b) {
  let tmp = a;
  a = b;
  b = tmp;
  console.log(a, b);
};

// 5
const reverseArray = (arr) => {
  let reversedArr = [];
  for (const value of arr) {
    reversedArr.unshift(value);
  }
  return reversedArr;
};

// 6
const capitalizeArray = (arr) =>
  arr.map((value) => {
    return value[0].toUpperCase().concat(value.substr(1));
  });

// 7
let arr7 = [];
const addItem = (item) => {
  arr7.push(item);
  return arr7;
};

// 8
const removeItem = (index) => {
  arr7.splice(index, 1);
  return arr7;
};

// 9
const evensAndOdds = (num) => {
  let evens = 0;
  let odds = 0;
  for (let i = 1; i <= num; i++) {
    i % 2 == 0 ? evens++ : odds++;
  }
  console.log("The number of odds are ", odds);
  console.log("The number of evens are ", evens);
};

// 13

const sum = (...arg) => arg.reduce((sum, curr) => sum + curr, 0);

// 1
const userIdGenerator = (idLength) => {
  let userId = "";
  const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let a2z = [];
  for (let i = 65; i <= 90; i++) {
    a2z.push(String.fromCharCode(i));
  }
  let A2Z = a2z.map((char) => char.toUpperCase());
  for (let i = 0; i <= idLength; i++) {
    switch (i % 3) {
      case 0:
        userId += NUMBERS[Math.floor(Math.random() * 10)];
        break;
      case 1:
        userId += a2z[Math.floor(Math.random() * 26)];
        break;
      case 2:
        userId += A2Z[Math.floor(Math.random() * 26)];
        break;
      default:
        userId += NUMBERS[0];
    }
  }
  return userId;
};

// Level 3
// 1
const userIdGeneratedByUser = () => {
  const characterCount = prompt("Tell me your expected number of characters: ");
  const idsCount = prompt("Tell me your expected number of ids: ");
  let userIds = "";
  for (let i = 0; i < idsCount; i++) {
    userIds += userIdGenerator(characterCount) + "\n";
  }
  console.log(userIds);
};

// 2
const generateColors = (type, count) => {
  let colors = [];
  switch (type) {
    case "hexa":
      for (let i = 0; i < count; i++) {
        colors.push("#" + generateHEXColorByCount(6));
      }

      break;
    case "rgb":
      for (let i = 0; i < count; i++) {
        colors.push(
          "rgb(" +
            Math.round(Math.random() * 255) +
            ", " +
            Math.round(Math.random() * 255) +
            ", " +
            Math.round(Math.random() * 255) +
            ")"
        );
      }

      break;
    default:
  }
  return colors;
};
const generateHEXColorByCount = (count) => {
  const VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let color = "";
  for (let i = 0; i < count; i++) {
    color += VALUES[Math.floor(Math.random() * VALUES.length)];
  }
  return color;
};

// 3
const shuffleArray = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    swapValuesOfArray(i, randomIndex, arr);
  }
  return arr;
};
const swapValuesOfArray = (i, j, arr) => {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

// 4
const factorial = (number) => {
  let result = 1;
  if (number > 1) {
    for (let i = 1; i <= number; i++) {
      result *= i;
    }
  }
  return result;
};

// 5
const isEmpty = (param) => {
  if (typeof param == "undefined") {
    console.log("param is undefined");
  } else if (param === null) {
    return true;
  } else if (typeof param == "boolean" || "number") {
    return false;
  } else if (typeof param == "string" && !param) {
    return true;
  } else if (Array.isArray(param) && !param.length) {
    return true;
  } else if (!Object.keys(param).length) {
    return true;
  } else {
    return false;
  }
};
console.log(isEmpty(0)); // false
console.log(isEmpty(null)); // true
console.log(isEmpty(undefined)); // param is undefined
console.log(isEmpty("")); // true
console.log(isEmpty([])); // true
console.log(isEmpty({})); // true
console.log(isEmpty(false)); // false

// 6
const average = (arr) => {
  let avg = 0;
  if (arr.some((value) => typeof value != "number")) {
    console.error("array should be all numbers");
  } else {
    let sum = arr.reduce((sum, curr) => sum + curr, 0);
    avg = Math.round(sum / arr.length);
  }
  return avg;
};
