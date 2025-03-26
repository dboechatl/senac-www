import conexao from "../database/conexao.js";
import AlunoRepository from "../repositories/AlunoRepository.js";

class AlunoController {
    // listar tudo
    index(req, res) {
        const row = AlunoRepository.findAll()
        res.json(row)
    }

    // listar por id
    show(req, res) {
        const id = req.params.id
        const sql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
        conexao.query(sql, id, (error, result) => {
            const row = result[0]
            if (error) {
                console.log(error)
                res.status(404).json({ 'error': error })
            } else {
                if (row) {
                    res.status(200).json(row);
                } else {
                    res.status(404).json("Aluno não encontrado!")
                }
            }
        })
    }

    //criar dados
    store(req, res) {
        const aluno = req.body
        const sql = "INSERT INTO `dbsenac`.`alunos` SET ?;"
        conexao.query(sql, aluno, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'error': error })
            } else {
                res.status(201).json(aluno);
            }
        })
    }

    // atualizar dados
    update(req, res) {
        const id = req.params.id;
        const aluno = req.body; // Pega as informações do aluno do corpo da requisição

        const checkSql = "SELECT * FROM dbsenac.alunos WHERE id=?;";
        conexao.query(checkSql, [id], (error, result) => {

            if (error) {
                console.log(error);
                return res.status(500).json({ 'error': 'Erro interno do servidor', 'details': error });
            }

            if (result.length === 0) { // Corrigido o erro de digitação aqui
                return res.status(404).json({ 'message': `Aluno com ID ${id} não encontrado.` });
            }

            // Se o aluno existir, faça o update
            const sql = "UPDATE dbsenac.alunos SET ? WHERE id=?;";
            conexao.query(sql, [aluno, id], (error, updateResult) => {
                if (error) {
                    console.log(error);
                    return res.status(400).json({ 'error': 'Erro ao atualizar o aluno', 'details': error });
                }

                // Verifica se a atualização foi bem sucedida
                if (updateResult.affectedRows === 0) {
                    return res.status(404).json({ 'message': `Aluno com ID ${id} não encontrado para atualização.` });
                }

                // Retorna o aluno atualizado
                res.status(200).json({ 'message': `Aluno com ID ${id} atualizado com sucesso.` });
            });
        });
    }

    // remover dados
    delete(req, res) {
        const id = req.params.id
        const sql = "DELETE FROM dbsenac.alunos WHERE id=?;"
        conexao.query(sql, [id], (error, result) => {
            const row = result[0]
            if (error) {
                console.log(error)
                return res.status(500).json({ 'error': 'Erro interno do servidor', 'details': error })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ 'message': `Aluno com ID ${id} não encontrado.` })
            }

            res.status(200).json({ 'message': `Aluno com ID ${id} excluído com sucesso.` })

        })
    }

}

// padrão singleton
export default new AlunoController()