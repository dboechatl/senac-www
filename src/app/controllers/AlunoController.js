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
        const row = await AlunoRepository.create(aluno)
        res.json(row) 
    }

    // atualizar dados
    async update(req, res) {
        const id = await req.params.id;
        const aluno = await req.body;
        const row = await AlunoRepository.update(aluno, id)
        res.json(row)
    }

    // remover dados
    async delete(req, res) {
        const id = await req.params.id
        const row = await AlunoRepository.delete(id)
        res.json(row) 
    }
    
}

// padrão singleton
export default new AlunoController()