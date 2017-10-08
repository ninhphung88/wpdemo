var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro',        species: 'dog' },
    { name: 'Hamilton',  species: 'dog' },
    { name: 'Harold',      species: 'fish' },
    { name: 'Ursula',      species: 'cat' },
    { name: 'Jimy',         species: 'fish' },    
];

var isDog = function(animal) {
    return animal.species === 'dog';
};

// Sử dụng Filter
// Truyền callback function trên mỗi lần filter lặp Array
var dogs = animals.filter(isDog);
var otherAnimals = animals.reject(isDog);

// normal
/*var dogs = [];
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species === 'dog') {
        dog.push(animals[i]);
    }
}*/