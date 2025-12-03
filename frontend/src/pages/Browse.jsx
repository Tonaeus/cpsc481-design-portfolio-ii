import { useState, useEffect } from 'react';
import { TextInput, Button, Paper, Text, Grid, Badge, Box, Stack, Group, Tooltip, Select, MultiSelect } from '@mantine/core';
import { Search, BookOpen, User, MapPin } from 'lucide-react';
import MOCK_BOOKS from '../assets/data/MockBooks';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [reservedBooks, setReservedBooks] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [sortOrder, setSortOrder] = useState('alpha-asc');

  // options for the multi-selects
  const [categoryOptions] = useState(() => Array.from(new Set(MOCK_BOOKS.flatMap(b => b.categories))).sort());
  const [authorOptions, setAuthorOptions] = useState(() => Array.from(new Set(MOCK_BOOKS.map(b => b.author))).sort());

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    // Filter by search (title and isbn only), category and author
    let results = MOCK_BOOKS.filter((book) => {
      const matchesSearch = query
        ? book.title.toLowerCase().includes(query) || book.isbn.includes(query)
        : true;
      const matchesCategory = selectedCategories.length > 0 ? selectedCategories.some(cat => (book.categories || []).includes(cat)) : true;
      const matchesAuthor = selectedAuthors.length > 0
        ? selectedAuthors.some(sel => book.author.toLowerCase().includes(sel.toLowerCase()))
        : true;
      return matchesSearch && matchesCategory && matchesAuthor;
    });

    // Apply sorting
    if (sortOrder === 'alpha-asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'alpha-desc') {
      results.sort((a, b) => b.title.localeCompare(a.title));
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Re-run search when filters or sorting change (if user has already searched)
  useEffect(() => {
    if (hasSearched) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedAuthors, sortOrder]);

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
            <Text size="sm" c="dimmed"></Text>
          </Box>
          <Group gap="xs">
            <TextInput
              placeholder="Enter book title or ISBN"
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

          {/* Filters & Sorting */}
          <Group mt="md" align="center" spacing="sm">
            <Text size="md" fw={600} style={{ color: '#1f2937' }}>Filters:</Text>
            <MultiSelect
              data={categoryOptions}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Filter by Category (multi)"
              style={{ minWidth: 200 }}
            />

            <MultiSelect
              data={authorOptions}
              value={selectedAuthors}
              onChange={setSelectedAuthors}
              placeholder="Filter by Author (type or pick)"
              searchable
              creatable
              getCreateLabel={(query) => `Add "${query}"`}
              onCreate={(query) => {
                const item = query;
                setAuthorOptions((prev) => [...prev, item]);
                return item;
              }}
              style={{ minWidth: 250 }}
            />

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
              <Text size="md" fw={600} style={{ color: '#1f2937' }}>Sort:</Text>
              <Select
                data={[
                  { value: 'alpha-asc', label: 'Alphabetical (A → Z)' },
                  { value: 'alpha-desc', label: 'Alphabetical (Z → A)' },
                ]}
                value={sortOrder}
                onChange={(val) => setSortOrder(val || 'alpha-asc')}
                style={{ width: 220 }}
              />
              <Button variant="subtle" onClick={() => { setSelectedCategories([]); setSelectedAuthors([]); setSortOrder('alpha-asc'); if (searchQuery.trim()) handleSearch(); }}>Clear Filters</Button>
            </div>
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
                          <Group spacing="xs">
                            {(book.categories || []).map((c) => (
                              <Badge
                                key={c}
                                variant="outline"
                                style={{ borderColor: '#14b8a6', color: '#14b8a6' }}
                              >
                                {c}
                              </Badge>
                            ))}
                          </Group>
                        </Group>
                        <Group>
                          <Text size="sm" c="dimmed" style={{ width: '80px' }}>Location:</Text>
                          <Group gap="xs">
                            <MapPin size={14} style={{ color: '#14b8a6' }} />
                            <Text size="sm" style={{ color: '#4b5563' }}>Aisle {book.location.aisle}, Shelf {book.location.shelf}</Text>
                          </Group>
                        </Group>
                      </Stack>

                      <Tooltip label="This book is checked out" disabled={book.available} position="top" withArrow>
                        <div>
                          <Button
                            fullWidth
                            variant={reservedBooks.has(book.id) ? 'filled' : 'outline'}
                            onClick={() => handleReserve(book.id)}
                            disabled={!book.available}
                            style={{
                              backgroundColor: reservedBooks.has(book.id)
                                ? '#14b8a6'
                                : !book.available
                                ? '#f3f4f6'
                                : 'transparent',
                              borderColor: reservedBooks.has(book.id) ? '#14b8a6' : !book.available ? '#e5e7eb' : '#14b8a6',
                              color: reservedBooks.has(book.id) ? 'white' : !book.available ? '#9ca3af' : '#14b8a6',
                            }}
                          >
                            {reservedBooks.has(book.id) ? 'Reserved' : 'Reserve Book'}
                          </Button>
                        </div>
                      </Tooltip>
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