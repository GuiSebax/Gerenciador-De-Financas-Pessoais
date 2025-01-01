import db from '../database/database';

// Criar uma meta
export const createGoal = (
    userId: number,
    amount: number,
    period: string
): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO goals (userId, amount, period) VALUES (?, ?, ?)`,
            [userId, amount, period],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retorna o ID da nova meta
                }
            }
        );
    });
};

// Buscar uma meta pelo ID
export const getGoalById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM goals WHERE id = ?`,
            [id],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

// Buscar todas as metas
export const getAllGoals = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT g.id, g.userId, g.amount, g.period, 
                    u.name as userName, u.email as userEmail
             FROM goals g
             JOIN users u ON g.userId = u.id`,
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

// Atualizar uma meta
export const updateGoal = (
    id: number,
    userId: number,
    amount: number,
    period: string
): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE goals 
             SET userId = ?, amount = ?, period = ?
             WHERE id = ?`,
            [userId, amount, period, id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

// Deletar uma meta
export const deleteGoal = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM goals WHERE id = ?`,
            [id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};
