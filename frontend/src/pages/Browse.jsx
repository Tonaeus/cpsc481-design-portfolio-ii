import { useState } from 'react';
import { TextInput, Button, Paper, Text, Grid, Badge, Box, Stack, Group } from '@mantine/core';
import { Search, BookOpen, User, MapPin } from 'lucide-react';

// Mock book data
const MOCK_BOOKS = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    available: true,
    location: { aisle: 'A', shelf: '3' },
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    category: 'Fiction',
    available: true,
    location: { aisle: 'A', shelf: '5' },
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    available: false,
    location: { aisle: 'A', shelf: '2' },
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    category: 'Romance',
    available: true,
    location: { aisle: 'B', shelf: '1' },
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0-316-76948-0',
    category: 'Fiction',
    available: true,
    location: { aisle: 'A', shelf: '4' },
  },
  {
    id: '6',
    title: 'Animal Farm',
    author: 'George Orwell',
    isbn: '978-0-452-28424-1',
    category: 'Fiction',
    available: false,
    location: { aisle: 'A', shelf: '5' },
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-547-92822-7',
    category: 'Fantasy',
    available: true,
    location: { aisle: 'C', shelf: '2' },
  },
  {
    id: '8',
    title: 'Moby-Dick',
    author: 'Herman Melville',
    isbn: '978-0-14-243724-7',
    category: 'Adventure',
    available: true,
    location: { aisle: 'D', shelf: '1' },
  },
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [reservedBooks, setReservedBooks] = useState(new Set());

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = MOCK_BOOKS.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.includes(query) ||
        book.category.toLowerCase().includes(query)
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReserve = (bookId) => {
    setReservedBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  return (
    <Stack gap="lg">
      <Paper shadow="md" p="xl" radius="md" style={{ backgroundColor: 'white' }}>
        <Stack gap="md">
          <Box>
            <Text size="lg" fw={600} mb={4} style={{ color: '#1f2937' }}>Search for Books</Text>
            <Text size="sm" c="dimmed">Search by title, author, ISBN, or category</Text>
          </Box>
          <Group gap="xs">
            <TextInput
              placeholder="Enter book title, author, ISBN, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              leftSection={<Search size={16} />}
              style={{ flex: 1 }}
              size="md"
              styles={{
                input: {
                  borderColor: '#d1d5db',
                  '&:focus': {
                    borderColor: '#14b8a6'
                  }
                }
              }}
            />
            <Button 
              onClick={handleSearch} 
              size="md" 
              style={{ 
                backgroundColor: '#14b8a6',
                '&:hover': { backgroundColor: '#0f9d8e' }
              }}
            >
              Search
            </Button>
          </Group>
        </Stack>
      </Paper>

      {/* Search Results */}
      {hasSearched && (
        <Stack gap="md">
          <Text c="dimmed" size="sm" style={{ paddingLeft: '0.25rem' }}>
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
          </Text>

          {searchResults.length === 0 ? (
            <Paper shadow="md" p="xl" radius="md" style={{ backgroundColor: 'white' }}>
              <Text ta="center" c="dimmed">
                No books found matching your search criteria.
              </Text>
            </Paper>
          ) : (
            <Grid>
              {searchResults.map((book) => (
                <Grid.Col key={book.id} span={{ base: 12, md: 6 }}>
                  <Paper 
                    shadow="md" 
                    p="lg" 
                    radius="md" 
                    style={{ 
                      height: '100%', 
                      transition: 'all 0.2s',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(20, 184, 166, 0.2)';
                      e.currentTarget.style.borderColor = '#14b8a6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <Stack gap="md">
                      <Group justify="space-between" align="flex-start">
                        <Box style={{ flex: 1 }}>
                          <Group gap="xs" mb="xs">
                            <BookOpen size={20} style={{ color: '#14b8a6', flexShrink: 0 }} />
                            <Text fw={600} style={{ color: '#1f2937' }}>{book.title}</Text>
                          </Group>
                          <Group gap="xs">
                            <User size={16} style={{ color: '#9ca3af' }} />
                            <Text size="sm" c="dimmed">{book.author}</Text>
                          </Group>
                        </Box>
                        <Badge 
                          color={book.available ? 'teal' : 'gray'} 
                          variant="light"
                          style={{
                            backgroundColor: book.available ? '#d1fae5' : '#f3f4f6',
                            color: book.available ? '#047857' : '#6b7280'
                          }}
                        >
                          {book.available ? 'Available' : 'Checked Out'}
                        </Badge>
                      </Group>

                      <Stack gap="xs">
                        <Group>
                          <Text size="sm" c="dimmed" style={{ width: '80px' }}>ISBN:</Text>
                          <Text size="sm" style={{ color: '#4b5563' }}>{book.isbn}</Text>
                        </Group>
                        <Group>
                          <Text size="sm" c="dimmed" style={{ width: '80px' }}>Category:</Text>
                          <Badge 
                            variant="outline" 
                            style={{ 
                              borderColor: '#14b8a6', 
                              color: '#14b8a6' 
                            }}
                          >
                            {book.category}
                          </Badge>
                        </Group>
                        <Group>
                          <Text size="sm" c="dimmed" style={{ width: '80px' }}>Location:</Text>
                          <Group gap="xs">
                            <MapPin size={14} style={{ color: '#14b8a6' }} />
                            <Text size="sm" style={{ color: '#4b5563' }}>Aisle {book.location.aisle}, Shelf {book.location.shelf}</Text>
                          </Group>
                        </Group>
                      </Stack>

                      <Button 
                        fullWidth 
                        variant={reservedBooks.has(book.id) ? 'filled' : 'outline'}
                        onClick={() => handleReserve(book.id)}
                        disabled={!book.available}
                        style={{
                          backgroundColor: reservedBooks.has(book.id) ? '#14b8a6' : 'transparent',
                          borderColor: '#14b8a6',
                          color: reservedBooks.has(book.id) ? 'white' : '#14b8a6',
                          '&:hover': {
                            backgroundColor: reservedBooks.has(book.id) ? '#0f9d8e' : '#f0fdfa'
                          }
                        }}
                      >
                        {reservedBooks.has(book.id) ? 'Reserved' : 'Reserve Book'}
                      </Button>
                    </Stack>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Browse;