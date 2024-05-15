import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(() => fetchProductsList).toBeInstanceOf(Function);
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const expected = await fetchProductsList('computador');
    const array = 50;
    expect(expected.length).toEqual(array);
  });

  it(
    'verifica se fetchProductsList com o argumento computador é igual a computadorSearch',
    async () => {
      const comp = await fetchProductsList('computador');
      expect(comp).toEqual(computadorSearch);
    },
  );

  it(
    'verifica se fetchProductsList com o argumento computador é igual a computadorSearch',
    async () => {
      const comp = await fetchProductsList('computador');
      expect(comp).toEqual(computadorSearch);
    },
  );

  it(
    'Veridica se fetchProductsList passada sem parâmetro retorna erro',
    () => {
      expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
    },
  );

  it('fetch é chamado com um parâmetro undefinded fetchProductsList', async () => {
    const param = 'undefined';
    const actual = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
    const functionInput = fetchProductsList(param);
    await expect(() => functionInput).rejects.toThrow(actual);
  });
});
