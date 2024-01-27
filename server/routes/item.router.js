const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js'); 

router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order
    const sqlText = `SELECT * FROM shoppinglist ORDER BY is_purchased, name ASC;`;
    pool
      .query(sqlText)
      .then((result) => {
        console.log(`Got stuff back from the database`, result);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      });
  });

  router.post('/', (req, res) => {
    const item = req.body;
    const sqlText = `INSERT INTO shoppinglist (name, quantity, unit) 
                      VALUES($1,$2,$3)`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool
      .query(sqlText, [item.name, item.quantity,item.unit])
      .then((result) => {
        console.log(`Added item to the database`, item);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      });
  });
  

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const sqlText = `UPDATE shoppinglist
    SET
        is_purchased = True
    WHERE
        ID = $1;`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool
      .query(sqlText, [id])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      });
  });
  router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sqlText = 'DELETE  FROM shoppinglist WHERE id = $1;';
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool
      .query(sqlText,[id])
      .then((result) => {
        console.log(`Deleted creature to the database`);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      });
  }); 


  router.delete('/', (req, res) => {
    const sqlText = 'DELETE  FROM shoppinglist;';
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool
      .query(sqlText)
      .then((result) => {
        console.log(`Deleted creature to the database`);
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      });
  }); 
  


  module.exports = router;