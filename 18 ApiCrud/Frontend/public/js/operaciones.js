function createNewItem(event) {
    event.preventDefault();

    
    const name = document.getElementById('newItemName').value;
    const price = document.getElementById('newItemPrice').value;
    const stock = document.getElementById('newItemStock').value;
    const category_id = document.getElementById('newItemCategory').value;
   
   let id = category_id+1;


    const newItem = {
        category_id: category_id,
        name: name,
        price: price,
        stock: stock
    };


    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto creado:', data);
        // Aquí puedes agregar código para actualizar la interfaz de usuario después de crear el producto
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
    });
}