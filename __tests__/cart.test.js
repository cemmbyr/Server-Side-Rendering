/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Cart from '../client/components/cart';

it('sum text correctly', () => {
  const { getByTestId } = render(<Cart />);

  expect(getByTestId('sum')).toHaveTextContent('Toplam Tutar: 0');
});

it('snapshot', () => {
  const dom = renderer.create(<Cart />).toJSON();

  expect(dom).toMatchSnapshot();
});
