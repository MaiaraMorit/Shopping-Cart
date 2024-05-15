import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCustomElement,
  createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// requisito 3
const getSectionProducts = document.querySelector('.products');

fetchProductsList('computador').then((data) => {
  data.forEach((product) => {
    const criandoElementos = createProductElement(product);
    getSectionProducts.appendChild(criandoElementos);

    const id = document.querySelector('.product__id').innerHTML;
    const title = document.querySelector('.product__title').innerText;
    const thumbnail = document.querySelector('.product__image').src;
    const price = document.querySelector('.product__price').innerText;
    const details = { id, title, thumbnail, price };

    // console.log(fetchProduct('MLB1678512883'));
    createProductElement(details);
  });
});

const loadingElement = createCustomElement('p', 'loading', 'Carregando...');
const functionLoading = () => getSectionProducts.appendChild(loadingElement);
const removeLoading = () => {
  setTimeout(() => getSectionProducts.removeChild(loadingElement), 100);
};

const messageRecarregue = 'Algum erro ocorreu, recarregue a página e tente novamente';
const loadingError = createCustomElement('span', 'error', messageRecarregue);
const shoWMessageError = () => getSectionProducts.appendChild(loadingError);

const showMeProducts = async () => {
  functionLoading();
  try {
    await fetchProductsList('computador');
  } catch (error) {
    shoWMessageError();
  } finally {
    removeLoading();
  }
};

// _____________________________________________________

// a fetchproduct me retorna um objeto com atributos preco id ...

const getCartFromLocalStorage = () => {
  const savedCartIDs = getSavedCartIDs();

  const arrayPromises = savedCartIDs.map((product) => {
    const productPromise = fetchProduct(product);
    return productPromise;
  });
  Promise.all(arrayPromises).then((products) => {
    products.forEach((product) => {
      // console.log(product);
      const { id } = product;
      const { title } = product;
      const { pictures } = product;
      const { price } = product;
      const details = { id, title, pictures, price };
      // console.log(details);
      const element = createCartProductElement(details);
      document.querySelector('.cart__products').appendChild(element); // esou colocando na tela o meu elemento.
    });
  });
};

window.onload = async () => {
  await showMeProducts();
  await getCartFromLocalStorage();
};
