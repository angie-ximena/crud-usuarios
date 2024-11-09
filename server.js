// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tupassword',
    database: 'crud_db'
});

connection.connect(error => {
    if (error) throw error;
    console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD
// Obtener todos los usuarios
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Crear usuario
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(query, [name, email], (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId, name, email });
    });
});

// Actualizar usuario
app.put('/api/users/:id', (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    connection.query(query, [name, email, id], (error) => {
        if (error) throw error;
        res.json({ id: parseInt(id), name, email });
    });
});

// Eliminar usuario
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (error) => {
        if (error) throw error;
        res.json({ message: 'Usuario eliminado' });
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});