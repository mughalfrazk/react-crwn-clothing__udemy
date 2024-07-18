import { screen } from '@testing-library/react';

import Category from '../category.component';
import { renderWithProvider } from '../../../utils/test/test.utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  }),
}));

describe('Category component tests', () => {
  test('It should render a Spinner if isLoading', () => {
    renderWithProvider(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('It should render Categories if isLoading is false', () => {
    renderWithProvider(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
              ],
            },
          ],
        },
      },
    });

    expect(screen.queryByTestId('spinner')).toBeNull();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});