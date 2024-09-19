const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'performance_wear_store'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});


const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = 'uploads/';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

// Admin Sign-In Route
app.post('/api/admin/signin', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Add Product Route
app.post('/api/admin/products', upload.single('image'), (req, res) => {
  const { category, subcategory, name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  const sql = 'INSERT INTO products (category, subcategory, name, image, price) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [category, subcategory, name, image, price], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Get Products Route
app.get('/api/admin/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/products/:category/:subcategory', (req, res) => {
  const { category, subcategory } = req.params;
  const sql = 'SELECT * FROM products WHERE category = ? AND subcategory = ?';
  db.query(sql, [category, subcategory], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [productId], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});

app.post('/api/cart', (req, res) => {
  const { name, image, price, size } = req.body;
  const sql = 'INSERT INTO cart (name, image, price, size) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, image, price, size], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Get Cart Items
app.get('/api/cart', (req, res) => {
  const sql = 'SELECT * FROM cart';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Clear Cart 
app.delete('/api/cart/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM cart WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.get('/api/cart/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM cart';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
