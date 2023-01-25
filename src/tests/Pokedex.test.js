import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../pages';
import data from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemonList={ data }
    isPokemonFavoriteById={ readFavoritePokemonIds }
  />);
});

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  const h2 = screen.getByRole('heading', { name: 'Encountered Pokémon' });
  expect(h2).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
  const button = screen.getByText('Próximo Pokémon');
  expect(button).toBeInTheDocument();

  expect(screen.getByText('Pikachu')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Charmander')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Caterpie')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Ekans')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Alakazam')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Mew')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Rapidash')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Snorlax')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Dragonair')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const pikachu = screen.getByText('Pikachu');
  const charmander = screen.queryByText('Charmander');

  expect(pikachu).toBeInTheDocument();

  expect(charmander).not.toBeInTheDocument();
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const filtros = screen.getAllByTestId('pokemon-type-button');
  expect(filtros).toHaveLength(7);
});

test('Selecionando um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo E o botão ALL deve estar presente em todos os tipos', () => {
  const nextButton = screen.getByText('Próximo Pokémon');
  const eletricFilter = screen.getByRole('button', { name: 'Electric' });
  const fireFilter = screen.getByRole('button', { name: 'Fire' });
  const bugFilter = screen.getByRole('button', { name: 'Bug' });
  const poisonFilter = screen.getByRole('button', { name: 'Poison' });
  const psychicFilter = screen.getByRole('button', { name: 'Psychic' });
  const normalFilter = screen.getByRole('button', { name: 'Normal' });
  const dragonFilter = screen.getByRole('button', { name: 'Dragon' });
  const pokemontype = 'pokemon-type';

  userEvent.click(eletricFilter);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Electric');

  userEvent.click(fireFilter);
  expect(screen.getByText('Charmander')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Fire');
  userEvent.click(nextButton);
  expect(screen.getByText('Rapidash')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Fire');
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();

  userEvent.click(bugFilter);
  expect(screen.getByText('Caterpie')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Bug');
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();

  userEvent.click(poisonFilter);
  expect(screen.getByText('Ekans')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Poison');
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();

  userEvent.click(psychicFilter);
  expect(screen.getByText('Alakazam')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Psychic');
  userEvent.click(nextButton);
  expect(screen.getByText('Mew')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Psychic');
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();

  userEvent.click(normalFilter);
  expect(screen.getByText('Snorlax')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Normal');
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();

  userEvent.click(dragonFilter);
  expect(screen.getByText('Dragonair')).toBeInTheDocument();
  expect(screen.getByTestId(pokemontype)).toHaveTextContent('Dragon');
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão All para resetar o filtro, que NÃO CONTÉM o testid "pokemon-type-button"', () => {
  const buttonAll = screen.getByRole('button', { name: 'All' });
  const button = screen.getByTestId('next-pokemon');
  expect(button).toBeInTheDocument();
  expect(buttonAll).toBeInTheDocument();
  userEvent.click(buttonAll);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.getByText('Charmander')).toBeInTheDocument();

  userEvent.click(buttonAll);

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});
