import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });

    expect(textNotFound).toBeInTheDocument();
  });

  test('Existe uma imagem com o src https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img');

    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
