import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
// import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Teste se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Testa se a fetch é chamada corretamente com prametro "MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('testa se o endpont correto é chamado com argumento MLB1405519561', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it(
    'Testa se a estrutura de dados da função fetchProduc é igual a de produto',
    async () => {
      const functionTest = await fetchProduct('MLB1405519561');
      expect(functionTest).toEqual(product);
    },
  );

  it('fetch chamado sem argumento deve retornar um error', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
