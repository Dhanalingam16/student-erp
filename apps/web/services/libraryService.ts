import { mockLibraryBooks } from '@school-erp/mock-data';
import { LibraryBook } from '@school-erp/types';

export const libraryService = {
  async getBooks(): Promise<LibraryBook[]> {
    return Promise.resolve(mockLibraryBooks);
  }
};
