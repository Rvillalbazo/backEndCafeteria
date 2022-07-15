const CODE_200 = 200;
const CODE_201 = 201;
const CODE_400 = 400;
const CODE_401 = 401;
const CODE_403 = 403;
const CODE_404 = 404;
const CODE_500 = 500;

const OK = 'Operación exitosa.';
const CREATED = 'La solicitud ha tenido éxito y se ha creado un nuevo recurso.';
const BAD_REQUEST = 'El servidor no pudo interpretar la solicitud dada una sintaxis inválida.';
const FORBIDDEN = 'Permisos insuficientes.';
const NOT_FOUND = 'No se pudo encontrar el recurso solicitado.';
const INTERNAL_SERVER_ERROR = 'Error interno de servidor.';

module.exports = {
    CODE_200, CODE_201, CODE_400, CODE_401, CODE_403, CODE_404, CODE_500, OK,
    CREATED, BAD_REQUEST, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR
}