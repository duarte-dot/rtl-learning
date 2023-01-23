import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Os links possuem os nomes corretos', () => {
    const favoritePokemonConst = 'Favorite Pokémon';
    renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoritePokemonLink = screen.getByText(favoritePokemonConst);

    expect(favoritePokemonLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);

    const encounteredPokemon = screen.getByText('Encountered Pokémon');

    expect(encounteredPokemon).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);

    const aboutPokedex = screen.getByText('About Pokédex');

    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    renderWithRouter(<App />);
    const favoritePokemonConst = 'Favorite Pokémon';
    const favoritePokemon = screen.getByText(favoritePokemonConst);
    userEvent.click(favoritePokemon);

    const aboutPokedex = screen.getByRole('heading', { name: favoritePokemonConst, level: 2 });

    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    const invalidRoute = '/123-123-123';

    act(() => {
      history.push(invalidRoute);
    });

    const title404 = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(title404).toBeInTheDocument();
  });
});
