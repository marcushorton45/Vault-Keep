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
    signup: (req, res) => {
        let {username, password} = req.body;
        console.log(req.body)


        sequelize
            .query("SELECT * FROM users WHERE username = ?;", {
                replacements: [username],
                type: sequelize.QueryTypes.SELECT,
            })
            .then((dbRes) => {
                console.log(dbRes[0])
                if (dbRes[0]){
                    return res.send('username already exists')
                }
                sequelize
                    .query(
                    "INSERT INTO users (username, password) VALUES (?, ?) RETURNING *;",
                    {
                      replacements: [username, password],
                      type: sequelize.QueryTypes.INSERT,
                    }
                  )
                    .then((dbRes) => res.status(200).send(dbRes[0][0]))
                    .catch((err) => console.log(err));
            })
    },

    login: (req, res) => {
        let { username, password } = req.body;


        sequelize
        .query("SELECT * FROM users WHERE username = ?;", {
            replacements: [username],
            type: sequelize.QueryTypes.SELECT,
          })
        .then((dbRes) => {
            if (!dbRes[0]){
                return res.status(401).send('User not found')
            } else if(password !== dbRes[0].password) {
                return res.status(401).send("Incorrect password");
            } else {
                return res.status(200).send({ username: dbRes[0].username, id: dbRes[0].id});
            }
        })
        .catch((err) => console.log(err))
    },
};