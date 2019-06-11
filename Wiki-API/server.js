const express = require('express');
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
const ejs = require('ejs');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "wikidb",
    password: "pass",
    port: 5432
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



app.route("/articles")
    .get((_req, res) => {

        pool.query('SELECT * FROM articles', (error, results) => {
            if (error) {
                console.log(error);
                throw error
            }

            res.send(results.rows);

        })
    })
    .post((req, res) => {

        pool.query('INSERT INTO articles (title, content) VALUES ($1, $2)', [req.body.title, req.body.content], (error, _result) => {
            if (error) {
                throw error
            }
            res.sendStatus(200);
        });


    })
    .delete((_req, res) => {
        pool.query('DELETE FROM articles', (error, _results) => {
            if (error) {
                throw error
            }
            res.send("All articles are deleted");

        })
    });

app.route("/articles/:articleTitle")
    .get((req, res) => {
        pool.query('SELECT * FROM articles WHERE title=$1', [req.params.articleTitle], (error, results) => {
            if(error) {
                throw error
            }

                res.send(results.rows);
            
        })
    })

    .put((req, res) => {
        pool.query('UPDATE articles SET title=$1, content=$2 WHERE title=$3', [req.body.title, req.body.content, req.params.articleTitle], (error, _results) => {
            if(error) {
                throw error
            }
            res.send("Article has been updated");
        })
    })

    .delete((req, res) => {
        pool.query('DELETE FROM articles WHERE title=$1', [req.params.articleTitle], (error, _results) => {
            if(error) {
                throw error
            }
            res.send("Article has been deleted");
        })
    });


app.listen(3000, function (err, _res) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Server running on port 3000");
    }


});