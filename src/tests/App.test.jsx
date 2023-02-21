// /* eslint-disable */
import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRedux from './Config';

test(
  'A página deve ter um botão para adicionar uma nova tarefa e os botoes para listar',
  () => {
    const initialState = {};
    renderWithRedux(<App />, { initialState });

    const buttons = screen.getAllByRole('button');
    const addButton = screen.getByTitle('Salvar tarefa');
    const listAllBtn = screen.getByTestId('list-button');
    const listInProgressBtn = screen.getByTestId('list-inProgress-button');
    const listDoneBtn = screen.getByTestId('list-done-button');

    expect(buttons).toHaveLength(4);
    expect(addButton).toBeInTheDocument();
    expect(listAllBtn).toBeInTheDocument();
    expect(listInProgressBtn).toBeInTheDocument();
    expect(listDoneBtn).toBeInTheDocument();
  },
);
