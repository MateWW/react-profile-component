const faker = require("faker/locale/pl");


function getRange(count) {
    return new Array(count).fill('').map((_,index) => index+1);
}

function getRandomLorem() {
    const optionsCount = Object.keys(faker.lorem).length - 1;
    const index = Math.floor(Math.random() * optionsCount);
    const option = Object.keys(faker.lorem)[index];
    return faker.lorem[option]();
}

function generateComments(){
    const recordCount = Math.floor(Math.random() * 150 + 250);
    
    return getRange(recordCount).map( (id) => ({
        id,
        author: {
            fullName: faker.name.findName(),
            avatar: faker.image.avatar(),
            address: `${faker.address.city()}, ${faker.address.country()}`,
        },
        date: faker.date.past(),
        text: getRandomLorem(),
    }))
}

module.exports = {
    generateComments
}