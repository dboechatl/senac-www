// Código necessário para a comunicação com o BD
import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'dbsenac'
})

conexao.connect()

export default conexao