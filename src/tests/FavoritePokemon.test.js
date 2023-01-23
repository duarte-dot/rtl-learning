import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const textNotFound = screen.getByText('No favorite Pokémon found');

    expect(textNotFound).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuPath = '/pokemon/25';
    const favoritePokemons = screen.getByText('Favorite Pokémon');
    const pikachuName1 = screen.queryByText('Pikachu');

    userEvent.click(favoritePokemons);
    expect(pikachuName1).not.toBeInTheDocument();

    act(() => {
      history.push(pikachuPath);
    });

    const checkboxFavorite = screen.getByRole('checkbox');

    userEvent.click(checkboxFavorite);
    userEvent.click(favoritePokemons);

    const favoriteIcon = screen.getByRole('img', { name: 'Pikachu sprite' });
    const pikachuName2 = screen.getByText('Pikachu');

    expect(pikachuName2).toBeInTheDocument();
    expect(favoriteIcon).toBeInTheDocument();
  });
});
