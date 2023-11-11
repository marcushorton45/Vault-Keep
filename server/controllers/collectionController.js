require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

module.exports = { 

    collectionSubmit: (req, res) => {
        let {user_id, quote_collection, author_name_collection, category_collection} = req.body
        console.log(req.body)
                
            sequelize
                .query(`INSERT INTO collection (user_id, quote_collection, author_name_collection, category_collection) VALUES ('${user_id}','${quote_collection}','${author_name_collection}', '${category_collection}')`)
                .then((dbres) => res.status(200).send(dbres[0]))
                .catch((err) => console.log(err));
        },

    getQuotes: (req, res) => {

        sequelize
        .query(`SELECT * FROM collection`)
        .then((quotes) => res.status(200).send(quotes))
        .catch((err) => console.log(err));
        },
    
    
    };