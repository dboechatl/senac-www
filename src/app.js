import express from 'express'
import AlunoController from './app/controllers/AlunoController.js'

const app = express()

//indcar para o express para usar o body com jason
app.use(express.json())


//ROTAS

// **ANOTAR IDEIAS PARA MELHORAR O CÓDIGO, ENTRADA, SAÍDA, ETC**

//listar
app.get('/listas', AlunoController.index)


//bucar por id
app.get('/listas/:id', AlunoController.show)


//criar
app.post('/listas', AlunoController.store)


// update por id
app.put('/update/:id', AlunoController.update)


// deletar por id
app.delete('/delete/:id', AlunoController.delete)



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



