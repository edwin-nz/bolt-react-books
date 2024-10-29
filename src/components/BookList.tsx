import React from 'react';
import { useQuery } from 'react-query';
import { Book } from '../types/book';
import { fetchBooks } from '../services/api';
import { BookIcon, Loader } from 'lucide-react';

export const BookList: React.FC = () => {
  const { data: books, isLoading, error } = useQuery<Book[]>('books', fetchBooks);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Failed to load books. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {books?.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <BookIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-2">By {book.author}</p>
            <p className="text-sm text-gray-500 mb-4">{book.publishedYear}</p>
            <p className="text-gray-700 line-clamp-3">{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};