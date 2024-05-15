export const fetchProduct = async (idProduct) => {
  if (idProduct === undefined) {
    throw new Error('ID não informado');
  }
  const API_URL = await fetch(`https://api.mercadolibre.com/items/${idProduct}`);
  const data = await API_URL.json();
  const result = data;
  return result;
};

export const fetchProductsList = async (searchProduct) => {
  if (searchProduct === undefined) {
    throw new Error('Termo de busca não informado');
  }
  try {
    const API_URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchProduct}`);
    const data = await API_URL.json();
    const result = data.results;
    return result;
  } catch (error) {
    throw new Error(error.message); // levando o erro com o throw new error para que a próxima função possa lançar o erro dela.
  }
};
