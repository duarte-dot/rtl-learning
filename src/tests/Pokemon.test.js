import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

const charmanderMock = {
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://archives.bulbagarden.net/media/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://archives.bulbagarden.net/media/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://archives.bulbagarden.net/media/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://archives.bulbagarden.net/media/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
  summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
};

test('O nome correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<Pokemon pokemon={ charmanderMock } isFavorite={ false } />);
  const charmander = screen.getByText('Charmander');
  const pikachu = screen.queryByText('Pikachu');

  expect(pikachu).not.toBeInTheDocument();
  expect(charmander).toBeInTheDocument();
});

test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<Pokemon pokemon={ charmanderMock } isFavorite={ false } />);
  const charmanderType = screen.getByText('Fire');
  const pikachuType = screen.queryByText('Electric');

  expect(pikachuType).not.toBeInTheDocument();
  expect(charmanderType).toBeInTheDocument();
});

test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida', () => {
  renderWithRouter(<Pokemon pokemon={ charmanderMock } isFavorite={ false } />);
  const averageWeightCharmander = screen.getByText('Average weight: 8.5 kg');
  const averageWeightPikachu = screen.queryByText('Average weight: 6.0 kg');

  expect(averageWeightPikachu).not.toBeInTheDocument();
  expect(averageWeightCharmander).toBeInTheDocument();
});

test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon.', () => {
  renderWithRouter(<Pokemon pokemon={ charmanderMock } isFavorite={ false } />);
  const image = screen.getByRole('img');

  expect(image.src).toContain('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  expect(image.alt).toContain('Charmander sprite');
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido.', () => {
  renderWithRouter(<Pokemon pokemon={ charmanderMock } isFavorite={ false } />);
  const link = screen.getByText('More details');

  expect(link.href).toContain('/pokemon/4');
});

test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
  // renderWithRouter(<App />);

  // const nextButton = screen.getByText('Próximo Pokémon');
  // userEvent.click(nextButton);

  // const moreDetails = screen.getByText('More details');

  // expect(moreDetails).toBeInTheDocument();

  // userEvent.click(moreDetails);
  // const summary = screen.getByText('Summary');

  // expect(summary).toBeInTheDocument();

  const { history } = renderWithRouter(<Pokemon
    pokemon={ charmanderMock }
    isFavorite={ false }
  />);
  const link = screen.getByText('More details');

  userEvent.click(link);
  expect(history.location.pathname).toContain('/pokemon/4');
});

test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  renderWithRouter(<Pokemon
    pokemon={ charmanderMock }
    isFavorite
  />);

  const image = screen.getByRole('img', { name: /charmander is marked as favorite/i });
  expect(image.src).toContain('/star-icon.svg');
});
