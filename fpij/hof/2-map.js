var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro',        species: 'dog' },
    { name: 'Hamilton',  species: 'dog' },
    { name: 'Harold',      species: 'fish' },
    { name: 'Ursula',      species: 'cat' },
    { name: 'Jimy',         species: 'fish' },    
];

// Map
//var names = animals.map(function(animal) {
//    return animal.name + ' is a ' + animal.species;
//});

// ARROW FUNCTION ES6
var names = animals.map((animal) => animal.name);


// Normal
//var names = [];
//for (var i = 0; i < animals.length; i++) {
//    names.push(animals[i].name);
//}
console.log(names);