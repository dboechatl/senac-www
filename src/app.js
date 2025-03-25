import express from 'express'
import conexao from './app/database/conexao.js'
const app = express()

//indcar para o express para usar o body com jason
app.use(express.json())


//ROTAS

// **ANOTAR IDEIAS PARA MELHORAR O CÓDIGO, ENTRADA, SAÍDA, ETC**

//listar
app.get('/listas', (req, res) => {
  const sql = "SELECT * FROM dbsenac.alunos;"
  conexao.query(sql, (error, result) => {
    if (error) {
      console.log(error)
      res.status(404).json({ 'error': error })
    } else {
      res.status(200).send(result);
    }
  })
})


//bucar por id
app.get('/listas/:id', (req, res) => {
  const id = req.params.id
  const sql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
  conexao.query(sql, id, (error, result) => {
    const row = result[0]
    if (error) {
      console.log(error)
      res.status(404).json({ 'error': error })
    } else {
      if (row) {
        res.status(200).send(row);
      } else {
        res.status(404).send("Aluno não encontrado!")
      }
    }
  })
})


//criar
app.post('/listas', (req, res) => {
  const aluno = req.body
  const sql = "INSERT INTO `dbsenac`.`alunos` SET ?;"
  conexao.query(sql, aluno, (error, result) => {
    if (error) {
      console.log(error)
      res.status(404).json({ 'error': error })
    } else {
      res.status(201).send(aluno);
    }
  })
})


// deletar por id
app.delete('/delete/:id', (req, res) => {
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
})


// update por id
app.put('/update/:id', (req, res) => {
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
});















// Rota de exemplo teste: Retorna uma mensagem simples
app.get('/teste', (req, res) => {
  res.status(200).send('Não é vc que testa');
});


// Rota de exemplo 4: Retorna dados em formato JSON
app.get('/listasAlunos', (req, res) => {
  const dados = [
    {
      nome: 'José',
      idade: 23,
      curso: 'Programação Web',
      status: 'Ativo',
    },
    {
      nome: 'Maria',
      idade: 30,
      curso: 'Design Gráfico',
      status: 'Inativo',
    },
    {
      nome: 'Carlos',
      idade: 27,
      curso: 'Engenharia de Software',
      status: 'Ativo',
    }
  ];
  res.status(200).json(dados);
});


//Expor o objeto para outras rotas 
export default app



