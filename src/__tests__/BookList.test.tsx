import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BookList } from '../components/BookList';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://api.books_list/books', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        coverImage: 'https://example.com/cover.jpg',
        description: 'Test Description',
        publishedYear: 2024
      }
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('BookList', () => {
  it('renders books successfully', async () => {
    const queryClient = new QueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <BookList />
      </QueryClientProvider>
    );

    expect(await screen.findByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('By Test Author')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const queryClient = new QueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <BookList />
      </QueryClientProvider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    server.use(
      http.get('https://api.books_list/books', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BookList />
      </QueryClientProvider>
    );

    expect(await screen.findByText(/Failed to load books/)).toBeInTheDocument();
  });
});