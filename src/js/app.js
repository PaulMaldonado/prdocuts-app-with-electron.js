const electron = require('electron');

firebase.initializeApp({
  apiKey: "AIzaSyA4TRdhris4ZvWhh9dPHV14NI6lTFIfAps",
  authDomain: "stock-app-electron.firebaseapp.com",
  projectId: "stock-app-electron",
});

let db = firebase.firestore();


const formClick = document.getElementById('form-click');
formClick.addEventListener('click', createProducts);


function createProducts(e) {
  const title = document.getElementById('title').value;
  const quantity = document.getElementById('quantity').value;
  const description = document.getElementById('description').value;

  if(title === '' || quantity === '' || description === '') {
    alert('Los campos no se pueden guardar en blanco');

    return
  }

  db.collection('products').add({
    title: title,
    quantity: quantity,
    description: description
  })
    .then(function(docRef) {
      console.log('Los datos han sido guardados correctamente con el ID: ', docRef.id);
    })
    .catch(function(error) {
      console.log('Error al guardar los datos: ', error)
    });

  e.preventDefault();
}


function showProducts() {
  const productsUi = document.getElementById('products-ui');

  db.collection('products').get().then((querySnapshot) => {
    productsUi.innerHTML = '';

    querySnapshot.forEach((doc) => {
      productsUi.innerHTML += `
        <div class="card mb-3">
          <div class="card-header">
            Productos
          </div>
          <div class="card-body">
            <h5 class="card-title">${doc.data().title}</h5>
            <p class="card-text">${doc.data().quantity}</p>
            <p><strong>${doc.data().description}</strong></p>

            <button class="btn btn-danger" onclick="deleteProducts('${doc.data().title}')">Eliminar Producto</button>
          </div>
        </div>
      
      `;
    })
  })
}


function deleteProducts(title) {
  db.collection('products').doc(title).delete().then(function() {
    console.log('El producto ha sido eliminado satisfactoriamente');
  })
  .catch(function(error) {
    console.log('Error al intentar eliminar los datos');
  })
}


showProducts();

