require('dotenv').config();
const express = require('express'); // Primero importamos express
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname,'users.json');



const app = express(); //Funcion para inicializar esta aplicacion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//const PORT = 3000; // Generamos un puerto donde veremos nuestra aplicacion
const PORT = process.env.PORT || 3000;

//Construimos nuestra primer ruta. Para este ejemplo estamos enviando solo un Hola Mundo, pero podria ser lo que necesitemos
// Un JSON o HTML
app.get('/', (req, res)=>{
    res.send(`
        <h1>Curso Express.js</h1>
        <h2>Enrique Morales es el mejor</h2>
        <p>Esto es una aplicacion Node.js con express.js</p>
        <p> Corre en el puerto: ${PORT}</p>
        `);
});

app.get('/users/:id', (req,res)=>{
    const userId =  req.params.id;
    res.send(`Mostrar informacion del usuario con ID: ${userId}`)
});

app.get('/search', (req,res)=>{
    const terms = req.query.termino || 'No especificado';
    const category = req.query.categoria || 'Todas';

    res.send(`
        <h2>Resultados de Busqueda</h2>
        <p>Término: ${terms}</p>
        <p>Categoria: ${category}</p>
        `)
});

app.post('/form', (req, res)=>{
    const name= req.body.nombre || 'Anonimo';
    const email = req.body.email || 'No proporcionado';
    res.json({
        message:'Datos recibidos',
        data:{
            name,
            email
        }
    });
});


app.post('/api/data',(req, res)=>{
    const data = req.body;
    if (!data || Object.keys(data).length ===0){
        return res.status(400).json({error:'No se recebieron datos'});
    }
    
    res.status(201).json({
        message:'Datos JSON recibidos',
        data
    });


});

app.get('/users', (req,res)=>{
    fs.readFile(usersFilePath, 'utf-8', (err,data)=>{
        if(err){
            return res.status(500).json({error:'Error con conexión de datos.'});
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});


// Para que funcione nuestra aplicacion necesitamos escuchar hacia nuestro servidor
try {
    app.listen(PORT, () => {
        console.log(`Servidor: http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error);
}