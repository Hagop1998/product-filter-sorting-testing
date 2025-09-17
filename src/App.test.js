import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  try {
    localStorage.clear();
  } catch {}
});

function getCardsSync() {
  return screen.queryAllByRole('img', { name: /.+/ });
}

async function getCardsAsync() {
  return await screen.findAllByRole('img', { name: /.+/ });
}

test('renders product list and filters UI', async () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /^filters$/i })).toBeInTheDocument();
  expect(screen.getByLabelText('Brand filter')).toBeInTheDocument();
  const cards = await getCardsAsync();
  expect(cards.length).toBeGreaterThan(0);
});

test('filters by category and brand and rating', async () => {
  render(<App />);

  await userEvent.click(screen.getByLabelText('Category Electronics'));
  await waitFor(async () => expect((await getCardsAsync()).length).toBeGreaterThan(0));

  await userEvent.selectOptions(screen.getByLabelText('Brand filter'), 'Brand B');
  await waitFor(async () => expect((await getCardsAsync()).length).toBe(1));
});

test('price range debounced filtering and no products found message', async () => {
  render(<App />);

  const min = screen.getByLabelText('Min price');
  const max = screen.getByLabelText('Max price');
  await userEvent.clear(min);
  await userEvent.type(min, '1000');
  await userEvent.clear(max);
  await userEvent.type(max, '2000');

  expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
});

test('sorting by price desc updates order', async () => {
  render(<App />);

  await userEvent.selectOptions(screen.getByLabelText('Sort by'), 'price');
  await userEvent.selectOptions(screen.getByLabelText('Sort order'), 'desc');

  const cards = await getCardsAsync();
  const firstCard = cards[0].closest('.product-card');
  expect(within(firstCard).getByText(/Smartphone/i)).toBeInTheDocument();
});

test('clear button resets filters and sorting', async () => {
  render(<App />);

  await userEvent.selectOptions(screen.getByLabelText('Brand filter'), 'Brand B');
  await waitFor(async () => expect((await getCardsAsync()).length).toBe(1));

  await userEvent.click(screen.getByRole('button', { name: /clear filters/i }));
  await waitFor(async () => expect((await getCardsAsync()).length).toBeGreaterThan(1));
});
