import app from './app.js'


const port = 3000


//Escutando a porta 3000
app.listen(port,() =>{
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
})


