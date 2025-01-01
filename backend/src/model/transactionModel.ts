import db from '../database/database';

// Criar uma transação
export const createTransaction = (userId: number, amount: number, type: string, category: string, description: string, date: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO transactions (userId, amount, type, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, amount, type, category, description, date], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        )
    })
}

// Listar todas as transações
export const getAllTransactions = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT t.id, t.userId, t.amount, t.type, t.category, t.description, t.date, u.name as userName FROM transactions t JOIN users u ON t.userId = u.id',
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        )
    })
}

// Listar as transações pelo ID
export const getTransactionById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM transactions WHERE id = ?',
            [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        )
    })
}

// Atualizar uma transação
export const updateTransaction = (
    id: number,
    userId: number,
    amount: number,
    type: string,
    category: string,
    description: string,
    date: string
): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE transactions SET userId = ?, amount = ?, type = ?, category = ?, description = ?, date = ? WHERE id = ?',
        [userId, amount, type, category, description, date, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

// Deletar uma transação
export const deleteTransaction = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM transactions WHERE id = ?',
            [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        )
    })
}