import conexao from "../database/conexao.js";

class AlunoRepository {
    // cria um novo elemento
    create(aluno) {
        console.log(aluno)
        const sql = "INSERT INTO `dbsenac`.`alunos` SET ?;"
        return new Promise((resolve, reject) => {
            conexao.query(sql, aluno, (error, result) => {
                console.log(result)
                if (error) return reject('Não foi possível cadastrar')
                // mostra o resultado de forma adequada (transforma para string)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
    }

    // buscar tudo
    findAll() {
        const sql = "SELECT * FROM dbsenac.alunos;"
        // Promise possui 2 parâmetros: resolve (sucesso) e reject (erro)
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, result) => {
                console.log(result)
                if (error) return reject('Não foi possível localizar')
                // mostra o resultado de forma adequada (transforma para string)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
    }

    // buscar por id
    findById(id) {
        const sql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, result) => {
                console.log(result)
                if (error) return reject('Não foi possível localizar')
                // mostra o resultado de forma adequada (transforma para string)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
    }

    // atualizar
    update(aluno, id) {
        const sql = "UPDATE dbsenac.alunos SET ? WHERE id=?;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [aluno,id], (error, result) => {
                if (error) return reject('Não foi possível atualizar o aluno')
                // mostra o resultado de forma adequada (transforma para string)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
    }

    // delete
    delete(id) {
        const sql = "DELETE FROM dbsenac.alunos WHERE id=?;"
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, result) => {
                console.log(result)
                if (error) return reject('Não foi possível apagar')
                // mostra o resultado de forma adequada (transforma para string)
                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
    }
}


export default new AlunoRepository()