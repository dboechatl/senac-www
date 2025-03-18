import app from './src/app.js'

import conexao from './infra/conexao.js'


const port = 3000




// conexao.connect((error) =>{
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Conexão realizada com secesso!")
//         //Escutando a porta 3000
//         app.listen(port,() =>{
//         console.log(`Servidor rodando no endereço http://localhost:${port}`)
//         })
//     }
// })

//Estabelecer a conexao
// conexao.connect((error) =>{
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Conexão realizada com secesso!")
//     }
// }

// )

//Escutando a porta 3000
app.listen(port,() =>{
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
})


