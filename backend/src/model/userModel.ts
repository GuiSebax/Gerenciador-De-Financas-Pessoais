import db from '../database/database';

// Criar um Usuário
export const createUser = (name: string, email: string, password: string, role: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role], function(err) {
                if(err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        )
    })
}

// Buscar o usuário pelo ID
export const getUserById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

// Buscar Todos os usuários
export const getAllUsers = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

// Buscar usuário pelo e-mail (para autenticação)
export const getUserByEmail = (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

// Atualizar um usuário
export const updateUser = (id: number, name: string, email: string, password: string, role: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
            [name, email, password, role, id], (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        )
    })
}

// Deletar um usuário
export const  deleteUser = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => [
        db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        })
    ])
}
