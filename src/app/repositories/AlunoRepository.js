import conexao, { consulta } from "../database/conexao.js";

class AlunoRepository {
    // cria um novo elemento
    create(aluno) {
        console.log(aluno)
        const sql = "INSERT INTO `dbsenac`.`alunos` SET ?;"
        return consulta(sql, aluno, 'Não foi possível cadastrar')
    }

    // buscar tudo
    findAll() {
        const sql = "SELECT * FROM dbsenac.alunos;"
        return consulta(sql, '', 'Não foi possível localizar')
    }

    // buscar por id
    findById(id) {
        const sql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
        return consulta(sql, id, 'Não foi possível localizar')
    }

    // atualizar
    update(aluno, id) {
        const sql = "UPDATE dbsenac.alunos SET ? WHERE id=?;";
        return consulta(sql, [aluno, id], 'Não foi possível atualizar')
    }

    // delete
    delete(id) {
        const sql = "DELETE FROM dbsenac.alunos WHERE id=?;"
        return consulta(sql, id, 'Não foi possível apagar')
    }
}


export default new AlunoRepository()