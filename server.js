const express = require('express');
const cors = require('cors');
const { dbNoSQLConnection } = require('./config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            producto: '/api/v1/producto',
            categoria: '/api/v1/categoria',
            orden: '/api/v1/orden'
        }

        // Conectar a base de datos NoSQL
        this.connectDBNoSQL();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }
    
    // Conectar con base de datos NoSQL
    async connectDBNoSQL() {
        await dbNoSQLConnection();
    }

    middlewares() {
        // Habilitar CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.producto, require('./routes/producto'));
        this.app.use(this.paths.categoria, require('./routes/categoria'));
        this.app.use(this.paths.orden, require('./routes/orden'));
    }

    listen() {
        this.app.listen(+this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${ this.port }`);
        });        
    }
}

module.exports = Server;