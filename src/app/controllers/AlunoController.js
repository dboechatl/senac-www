import conexao from "../database/conexao.js";
import AlunoRepository from "../repositories/AlunoRepository.js";

class AlunoController {
    // listar tudo
    async index(req, res) {
        // findAll retorna uma promise e não temos como garantir o tempo de resposta
        const row = await AlunoRepository.findAll()
        res.json(row)
    }

    // listar por id
    async show(req, res) {
        const id = await req.params.id
        const row = await AlunoRepository.findById(id)
        res.json(row) 
    }

    //criar dados
    async store(req, res) {
        const aluno = req.body
        console.log(aluno)
        console.log(aluno)
        const row = await AlunoRepository.create(aluno)
        res.json(row) 
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