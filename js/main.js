
const productIitem = document.querySelector('.container-products');
const btnLoadMore = document.querySelector('.btn-loadMore');
const Form = document.querySelector('#formInfo');

let urlApi = `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1`

fetch(urlApi)
    .then(turnIntoJson)
    .then(loadItems)
    .catch(error => console.log('erro: ' + error))

let contClicks = 0;

function loadItems(data) {

    const lengthObj = data.products.length
    const products = data.products

    for (let i = 0; i < lengthObj; i++) {
        productIitem.innerHTML += `
                <div class="product-item">
                    <div class="image-item">
                        <img src="${products[i].image}" alt="Produto">
                    </div>
                    <h4 class="name-item">
                        ${products[i].name}
                    </h4>
                    <p class="desc-item">
                        ${products[i].description}
                    </p>
                    <span class="oldPrice-item">De: R$ ${products[i].oldPrice}</span>
                    <h4 class="price-item">Por: R$ ${products[i].price}</h4>
                    <span class="option-price-item">Ou: ${products[i].installments.count}x de R$ ${products[i].installments.value}</span>
                    <a href="#" class="buttom-item">Comprar</a>
                </div>
        `
    }

    contClicks++;
    console.log(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${contClicks}`)

    btnLoadMore.onclick = function (e) {
        fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${contClicks}`)
            .then(turnIntoJson)
            .then(loadItems)
            .catch(error => console.log(error))
    }
}

function turnIntoJson(response) {
    return response.json()
}

function nextPage() {
    urlApi = `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=2`;
    fetch(urlApi)
        .then(turnIntoJson)
        .then(loadItems)
        .catch(error => console.log('erro: ' + error))
}

Form.onsubmit = function (e) {
    e.preventDefault()

    let hasError = false

    /*   if (!hasError) {
          fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1`)
              .then(turnIntoJson)
              .then(loadItems)
              .catch(error => console.log('erro: ' + error))
      } */

}