// 1
let fruits = Array();

// 2
let categories = ["literature", "poetry", "fiction", "science", "art", "music"] ;

// 3
let categories_length = categories.length

// 4
let firstItem = categories.indexOf(0)
let middleItem = categories.indexOf(Math.floor(categories_length/2))
let lastItem = categories.indexOf(categories_length - 1);

// 5
let mixedDateTypes = [1, "I'm a string", [1, 2], {id: 1, label: "object"}, null, false]

// 6
var itCompanies = ["Facebook", "Google", "Microsoft", "Apple", "IBM", "Oracle", "Amazon"];

// 7
console.log(itCompanies)

// 8
let itCompanies_length = itCompanies.length;
console.log(itCompanies_length);

// 9
let firstCompany = itCompanies.indexOf(0);
let middleCompany = itCompanies.indexOf(Math.floor(itCompanies_length/2))
let lastCompany = itCompanies.indexOf(itCompanies_length - 1)

// 10 
itCompanies.forEach(function(company){
    console.log(company)
})

// 11
itCompanies.forEach(function(company){
    console.log(company.toUpperCase())
})

// 12 
let sentence = itCompanies.slice(1, itCompanies_length-1).join(", ").concat(" and ", lastCompany, " are big IT companies");
console.log(sentence)

// 13
