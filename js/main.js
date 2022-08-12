
const productIitem = document.querySelector('.container-products');
const btnLoadMore = document.querySelector('.btn-loadMore');
const containerLoadMore = document.querySelector('.container-loadMore');
const loading = document.querySelector("#loading");
const formInfo = document.querySelector('#formInfo');
const formShare = document.querySelector('#formShare');

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
                    <div>
                        <h4 class="name-item">
                            ${products[i].name}
                        </h4>
                        <p class="desc-item">
                            ${products[i].description}
                        </p>
                        <span class="oldPrice-item">De: R$ ${products[i].oldPrice}</span>
                        <h4 class="price-item">Por: R$ ${products[i].price}</h4>
                        <span class="option-price-item">Ou: ${products[i].installments.count}x de R$
                            ${products[i].installments.value}</span>
                        <a href="#" class="buttom-item">Comprar</a>
                    </div>
                </div>
        `
    }

    contClicks++;
    if (contClicks >= 4) {
        containerLoadMore.classList.add('remove');
    }

    btnLoadMore.onclick = function () {
        btnLoadMore.classList.add('remove');
        loading.classList.remove('remove');

        fetch(`https://${data.nextPage}`)
            .then(turnIntoJson)
            .then(loadItems)
            .catch(error => console.log(error))

        setTimeout(() => {
            btnLoadMore.classList.remove('remove');
            loading.classList.add('remove');
        }, 500)
    }
}

function turnIntoJson(response) {
    return response.json()
}

formInfo.onsubmit = function (event) {
    event.preventDefault()

    let hasError = false

    let inputName = document.forms['formInfo']['inputName']

    if (!inputName.value) {
        hasError = true;
        inputName.classList.add('inputError')

        // pegando o proximo irmao
        let span = inputName.nextSibling.nextSibling
        span.innerHTML = 'Digite o nome corretamente';
    }
    else {
        inputName.classList.remove('inputError')
        let span = inputName.nextSibling.nextSibling
        span.innerHTML = '';
    }

    let inputEmail = document.forms['formInfo']['inputEmail']
    let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!inputEmail.value || !inputEmail.value.match(emailValidation)) {
        hasError = true;
        inputEmail.classList.add('inputError')

        // pegando o proximo irmao
        let span = inputEmail.nextSibling.nextSibling
        span.innerHTML = 'Digite o Email corretamente';
    }
    else {
        inputEmail.classList.remove('inputError')
        let span = inputEmail.nextSibling.nextSibling
        span.innerHTML = '';
    }

    let inputCPF = document.forms['formInfo']['inputCPF']
    let cpfValidation = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/

    if (!inputCPF.value || !inputCPF.value.match(cpfValidation)) {
        hasError = true;
        inputCPF.classList.add('inputError')

        // pegando o proximo irmao
        let span = inputCPF.nextSibling.nextSibling
        span.innerHTML = 'Digite o CPF corretamente';
    }
    else {
        inputCPF.classList.remove('inputError')
        let span = inputCPF.nextSibling.nextSibling
        span.innerHTML = '';
    }

    let radio = document.forms['formInfo']['inputSex']
    if (!radio.value) {
        console.log(radio)
        hasError = true
        radio[1].classList.add('inputError')
        let span = radio[1].nextElementSibling.nextElementSibling
        span.innerText = 'Selecione uma opção'
    } else {
        radio[1].classList.remove('inputError')
        let span = radio[1].nextElementSibling.nextElementSibling
        span.innerText = ''
    }

    const btnForm = document.querySelector('#formInfo>button')

    if (!hasError) {
        sendIsPressed = 'sended'
        if (sendIsPressed === 'sended') {
            btnForm.classList.add('formSend')
            let span = btnForm.nextSibling.nextSibling
            span.innerText = 'Formulário enviado com sucesso'
        }
    }

}

formShare.onsubmit = function (event) {
    event.preventDefault()

    let hasError = false

    let friendName = document.forms['formShare']['friendName']

    if (!friendName.value) {
        hasError = true;
        friendName.classList.add('inputError')

        // pegando o proximo irmao
        let span = friendName.nextSibling.nextSibling
        span.innerHTML = 'Digite o nome corretamente';
    }
    else {
        friendName.classList.remove('inputError')
        let span = friendName.nextSibling.nextSibling
        span.innerHTML = '';
    }

    let friendEmail = document.forms['formShare']['friendEmail']
    let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!friendEmail.value || !friendEmail.value.match(emailValidation)) {
        hasError = true;
        friendEmail.classList.add('inputError')

        // pegando o proximo irmao
        let span = friendEmail.nextSibling.nextSibling
        span.innerHTML = 'Digite o Email corretamente';
    }
    else {
        friendEmail.classList.remove('inputError')
        let span = friendEmail.nextSibling.nextSibling
        span.innerHTML = '';
    }

    const btnForm = document.querySelector('#formShare>button')

    if (!hasError) {
        sendIsPressed = 'sended'

        if (sendIsPressed === 'sended') {
            btnForm.classList.add('formSend')
            let span = btnForm.nextSibling.nextSibling
            span.innerText = 'Formulário enviado com sucesso'
        }
    }

}

// smooth scroll

const menuItens = document.querySelectorAll('.containerButton a[href^="#"]')

menuItens.forEach(item => {
    item.addEventListener('click', scrollToId);
})

function scrollToId(event) {
    event.preventDefault(); // tirar o comportamento padrao => nao alterar a url e nem navegar com o html
    const to = getScrollTopByHref(event.target)
    scrollToPosition(to)
}

function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    const section = document.querySelector(id)
    const distance = section.offsetTop

    return distance;
}

function scrollToPosition(to) {
    /* window.scroll({
        top: to - 60,
        behavior: "smooth"
    }); */
    smoothScrollTo(0, to)
}


/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 600;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};