const mirrow = (req, res) => {
    const methods = [{
        method: 'POST',
        hashBody: true,
        purpose: "El método POST se utiliza para enviar una entrada a un recurso, especificando a menudo un cambio en el estado o efectos secundarios en el servidor."
    }, {
        method: 'PUT',
        hashBody: true,
        purpose: 'El método PUT reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición.'
    }, {
        method: 'PATCH',
        hashBody: true,
        purpose: "El método PATCH es utilizado para aplicar modificaciones parciales a un recurso."
    }, {
        method: 'HEAD',
        hashBody: false,
        purpose: "El método HEAD pide una respuesta idéntica a la de una petición GET pero sin el cuerpo de la respuesta."
    }, {
        method: 'GET',
        hashBody: false,
        purpose: "El método GET solicita la representación de un recurso específico. Las peticiones que utilizan el método GET solo deben recuperar datos."
    }, {
        method: 'DELETE',
        hashBody: false,
        purpose: "El método DELETE elimina el recurso especificado."
    }];

    const requestMethod = methods.find(m => m.method === req.method) || {
        method: req.method,
        hashBody: false,
        purpose: "Método no documentado en este endpoint."
    };
    requestMethod.purpose+=requestMethod.hashBody ? "Tiene cuerpo" : "No tiene cuertpo";
    if (requestMethod.hashBody) {
        req.body;//js debde de parsear mediante un JSON el objeto necesario
        res.json({...req.body, ruta_consumida : req.route.path ,...requestMethod})

        
    }else{
        res.json({ruta_consumida : req.originalUrl ,...requestMethod})
    }
};
module.exports =mirrow