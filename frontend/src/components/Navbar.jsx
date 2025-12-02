import { MantineProvider, Container, Box, Group, Button } from "@mantine/core";
import { Clock, CreditCard, FileText, Receipt, BookOpen } from 'lucide-react';
import { Link, useLocation } from "react-router";

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
    <MantineProvider>
      <Box style={{background: '#ffffff' }}>
                <Box style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #e5e7eb',
                padding: '0.75rem 0'
                }}>
                <Container size="xl">
                    <Group position="center" gap="md" style={{ width: '100%', justifyContent: 'center' }}>
                        <Button
                            variant="subtle"
                            leftSection={<BookOpen size={18} />}
                            component={Link}
                            to="/"
                            style={{
                            backgroundColor: isActive('/') ? '#14b8a6' : 'transparent',
                            color: isActive('/') ? 'white' : '#6b7280',
                            fontWeight: isActive('/') ? 600 : 400
                            }}
                        >
                            Home
                        </Button>

                        <Button
                            variant="subtle"
                            leftSection={<Clock size={18} />}
                            component={Link}
                            to="/history"
                            style={{
                            backgroundColor: isActive('/history') ? '#14b8a6' : 'transparent',
                            color: isActive('/history') ? 'white' : '#6b7280',
                            fontWeight: isActive('/history') ? 600 : 400
                            }}
                        >
                            History
                        </Button>

                        <Button
                            variant="subtle"
                            leftSection={<CreditCard size={18} />}
                            component={Link}
                            to="/payment"
                            style={{
                            backgroundColor: isActive('/payment') ? '#14b8a6' : 'transparent',
                            color: isActive('/payment') ? 'white' : '#6b7280',
                            fontWeight: isActive('/payment') ? 600 : 400
                            }}
                        >
                            Payment
                        </Button>

                        <Button
                            variant="subtle"
                            leftSection={<FileText size={18} />}
                            component={Link}
                            to="/report"
                            style={{
                            backgroundColor: isActive('/report') ? '#14b8a6' : 'transparent',
                            color: isActive('/report') ? 'white' : '#6b7280',
                            fontWeight: isActive('/report') ? 600 : 400
                            }}
                        >
                            Report
                        </Button>

                        <Button
                            variant="subtle"
                            leftSection={<Receipt size={18} />}
                            component={Link}
                            to="/transaction"
                            style={{
                            backgroundColor: isActive('/transaction') ? '#14b8a6' : 'transparent',
                            color: isActive('/transaction') ? 'white' : '#6b7280',
                            fontWeight: isActive('/transaction') ? 600 : 400
                            }}
                        >
                            Transaction
                        </Button>
                    </Group>
                </Container>
                </Box>
            </Box>
        </MantineProvider>
    );
}

export default Navbar;