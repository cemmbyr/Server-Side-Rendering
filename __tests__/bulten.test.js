/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import Bulten from '../client/components/bulten';
import { BultenContext } from '../client/context/context';

it('event length text correctly', () => {
  render(<Bulten />);

  expect(screen.getByText('Event Count:3000')).toBeInTheDocument();
});

it('button click correctly', () => {
  const apply = jest.fn();

  const { getByTestId } = render(
    <BultenContext.Provider value={{ applyEventItems: [], setApplyEventItems: apply }}>
      <Bulten />
    </BultenContext.Provider>,
  );

  fireEvent.click(getByTestId('button2101'));
  expect(apply).toHaveBeenCalledTimes(1);
});

it('snapshot', () => {
  const dom = renderer.create(<Bulten />).toJSON();

  expect(dom).toMatchSnapshot();
});
