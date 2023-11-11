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

    bookshelfSubmit: (req, res) => {
        let {user_id, article_title_bookshelf, author_name_bookshelf, genre_bookshelf} = req.body
        console.log(req.body)


            
            sequelize
                .query(`INSERT INTO bookshelf (user_id, article_title_bookshelf, author_name_bookshelf,
                genre_bookshelf) VALUES ('${user_id}','${article_title_bookshelf}','${author_name_bookshelf}','${genre_bookshelf}')`)
                .then((dbres) => res.status(200).send(dbres[0]))
                .catch((err) => console.log(err));

         },

    getArticles: (req, res) => {

        sequelize
        .query(`SELECT * FROM bookshelf`)
        .then((articles) => res.status(200).send(articles))
        .catch((err) => console.log(err));
    },

}