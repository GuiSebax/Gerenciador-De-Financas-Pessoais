import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'financa.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.message);
        return;
    } else {
        console.log('Conectado ao banco de dados com sucesso');
        db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('admin', 'user'))
            );`,
            (err) => {
                if (err) {
                    console.error('Erro ao criar a tabela de usuários', err.message);
                } else {
                    console.log('Tabela de usuários criada com sucesso');
            }});
        
        db.run(`CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                amount REAL NOT NULL CHECK (amount > 0),
                type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
                category TEXT NOT NULL,
                description TEXT,
                date TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE cascade
            );`,
            (err) => {
                if (err) {
                    console.error('Erro ao criar a tabela de transações', err.message);
                } else {
                    console.log('Tabela de transações criada com sucesso');
                }
            })
        
        db.run(`CREATE TABLE IF NOT EXISTS goals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER  NOT NULL,
                amount REAL NOT NULL CHECK (amount > 0),
                period TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE cascade
            )`)
    }
})


export default db;