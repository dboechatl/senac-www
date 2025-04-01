import conexao from "../database/conexao.js";

class AlunoRepository {
    // cria um novo elemento
    create(){}

    // buscar tudo
    findAll(){
        const sql = "SELECT * FROM dbsenac.alunos;"
        conexao.query(sql, (error, result) => {
            if (error) {
                // console.log(error)
                // res.status(404).json({ 'error': error })
                return error
            } else {
                console.log(result)
                return result
                // res.status(200).json(result);
            }
        })
    }

    // buscar por id
    findById(){}

    // atualizar
    update(){}

    // delete
    create(){}
}


export default new AlunoRepository()