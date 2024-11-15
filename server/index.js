const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'Mahi777m@', 
  database: 'contacts_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});


app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.post('/contacts', (req, res) => {
  const { firstName, lastName, email, phone, company, title } = req.body;
  const sql = 'INSERT INTO contacts (firstName, lastName, email, phone, company, title) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, phone, company, title], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...req.body });
  });
});


app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contacts WHERE id = ?', [id], err => {
    if (err) throw err;
    res.json({ message: 'Contact deleted' });
  });
});


app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, company, title } = req.body;
  const sql = 'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, phone = ?, company = ?, title = ? WHERE id = ?';
  db.query(sql, [firstName, lastName, email, phone, company, title, id], err => {
    if (err) throw err;
    res.json({ message: 'Contact updated' });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on  ${PORT}`));
