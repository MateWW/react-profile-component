const faker = require("faker/locale/pl");


module.exports = {
    generateUser: (id) => (
        {
            id,
            fullName: faker.name.findName(),
            address: `${faker.address.city()}, ${faker.address.country()}`,
            avatar: faker.image.avatar(),
            statistics: {
                likes: faker.random.number(),
                following: faker.random.number(),
                followers: faker.random.number(),
            },
            liked: false
        }
    )
}