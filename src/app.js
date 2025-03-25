import express from 'express'
import conexao from '../infra/conexao.js'
const app = express()

//indcar para o express para usar o body com jason
app.use(express.json())


//ROTAS

// **ANOTAR IDEIAS PARA MELHORAR O CÓDIGO, ENTRADA, SAÍDA, ETC**

//listar
app.get('/listas',(req,res)=>{
    const sql = "SELECT * FROM dbsenac.alunos;"
    conexao.query(sql, (error,result)=>{
      if (error) {
        console.log(error)
        res.status(404).json({'error':error})
      } else {
        res.status(200).send(result);
      }
    }) 
})


//bucar por id
app.get('/listas/:id',(req,res)=>{
    //let index  = req.params.id
    //console.log(index)
    //res.json(buscarAlunoporId(req.params.id));
    const id = req.params.id
    const sql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
    conexao.query(sql, id, (error,result)=>{
      const row = result[0]
      if (error) {
        console.log(error)
        res.status(404).json({'error':error})
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
app.post('/listas',(req,res)=>{
// listas.push(req.body)
const aluno = req.body
const sql = "INSERT INTO `dbsenac`.`alunos` SET ?;"
conexao.query(sql, aluno, (error,result)=>{
  if (error) {
    console.log(error)
    res.status(404).json({'error':error})
  } else {
      res.status(201).send(aluno);
    }
  })
})


// //deletar errado 
// app.delete('/listas',(req,res)=>{
//     listas.pop(req.body)
//     res.status(201).send('Aluno apagado com sucesso!')
// })


//delete
app.delete('/listas/:id',(req,res)=>{
  //let index  = req.params.id
  //console.log(index)
  //res.json(buscarAlunoporId(req.params.id));
  const id = req.params.id
  const sql = "DELETE FROM dbsenac.alunos WHERE id=?;"
  conexao.query(sql, id, (error,result)=>{
    if (error) {
      console.log(error)
      res.status(404).json({'error':error})
    } else {
        res.status(200).json(result)
    }
  })
})




















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



