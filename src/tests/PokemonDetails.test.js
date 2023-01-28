import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pikachuMock = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

test('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pokemon/25');
  });
  const pikachuDetails = screen.getByRole('heading', { name: `${pikachuMock.name} Details` });
  const pikachuDetailsSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
  const pikachuMockSummary = screen.getByText(`${pikachuMock.summary}`);
  expect(pikachuDetails).toBeInTheDocument();
  expect(pikachuDetailsSummary).toBeInTheDocument();
  expect(pikachuMockSummary).toBeInTheDocument();
});

test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByText('More details');
  expect(moreDetailsLink).toBeInTheDocument();
  userEvent.click(moreDetailsLink);
  const pikachuDetails = screen.getByText(`${pikachuMock.name} Details`);
  expect(pikachuDetails).toBeInTheDocument();
  expect(moreDetailsLink).not.toBeInTheDocument();
});

test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByText('More details');
  expect(moreDetailsLink).toBeInTheDocument();
  userEvent.click(moreDetailsLink);
  const gameLocationsOfPikachu = screen.getByRole('heading', { level: 2, name: `Game Locations of ${pikachuMock.name}` });
  expect(gameLocationsOfPikachu).toBeInTheDocument();
});

test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByText('More details');
  expect(moreDetailsLink).toBeInTheDocument();
  userEvent.click(moreDetailsLink);
  const pikachuLocations = pikachuMock.foundAt;
  const pikachuLocationsAtDetailsPage = screen.getAllByRole('img', { name: /pikachu location/i });
  expect(pikachuLocations.length).toBe(pikachuLocationsAtDetailsPage.length);
});

test('Devem ser exibidos o nome da localização e uma imagem com o alt e o src correto do mapa em cada localização', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByText('More details');
  expect(moreDetailsLink).toBeInTheDocument();
  userEvent.click(moreDetailsLink);
  const pikachuLocationsAtDetailsPage = screen.getAllByRole('img', { name: /pikachu location/i });
  expect(pikachuLocationsAtDetailsPage).toHaveLength(2);
  expect(pikachuLocationsAtDetailsPage[0].src).toContain(`${pikachuMock.foundAt[0].map}`);
  expect(pikachuLocationsAtDetailsPage[1].src).toContain(`${pikachuMock.foundAt[1].map}`);
});

test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByText('More details');
  expect(moreDetailsLink).toBeInTheDocument();
  userEvent.click(moreDetailsLink);
  const checkboxPokemonFavoritado = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(checkboxPokemonFavoritado).toBeInTheDocument();
  const favoriteImg = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteImg).not.toBeInTheDocument();
  userEvent.click(checkboxPokemonFavoritado);
  const favoriteImg2 = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteImg2).toBeInTheDocument();
});
