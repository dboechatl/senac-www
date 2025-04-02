// Código necessário para a conexão com o banco de dados
import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'dbsenac'
})

conexao.connect()

/**
 * Executa o código sql com ou sem valores
 * @param {string} sql instrução sql a ser executada
 * @param {string=id | [aluno, id]} params a serem passados para o sql
 * @param {string} mesageReject mensagem do Promise reject a ser exibida
 * @returns objeto da Promise
 */

export const consulta = (sql, params='', messageReject) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, params, (error, result) => {
            if (error) return reject(messageReject)
            // mostra o resultado de forma adequada (transforma para string)
            const row = JSON.parse(JSON.stringify(result))
            return resolve(row)
        })
    })
}

export default conexao
