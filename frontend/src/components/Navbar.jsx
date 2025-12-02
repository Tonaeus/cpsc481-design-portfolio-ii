import { MantineProvider, Container, Box, Group, Button } from "@mantine/core";
import { Clock, CreditCard, FileText, Receipt, BookOpen } from 'lucide-react';
import { Link } from "react-router";

const Navbar = () => {
    const currentPage = true;
    return (
    <MantineProvider>
      <Box style={{background: '#ffffff' }}>
                <Box style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #e5e7eb',
                padding: '0.75rem 0'
                }}>
                <Container size="xl">
                    <Group gap="md">
                    <Button
                        variant="subtle"
                        leftSection={<BookOpen size={18} />}
                        component={Link}
						to="/"
                        style={{
                        backgroundColor: currentPage === 'browse' ? '#14b8a6' : 'transparent',
                        color: currentPage === 'browse' ? 'white' : '#6b7280',
                        fontWeight: currentPage === 'browse' ? 600 : 400
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
                        backgroundColor: currentPage === 'history' ? '#14b8a6' : 'transparent',
                        color: currentPage === 'history' ? 'white' : '#6b7280',
                        fontWeight: currentPage === 'history' ? 600 : 400
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
                        backgroundColor: currentPage === 'payment' ? '#14b8a6' : 'transparent',
                        color: currentPage === 'payment' ? 'white' : '#6b7280',
                        fontWeight: currentPage === 'payment' ? 600 : 400
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
                        backgroundColor: currentPage === 'report' ? '#14b8a6' : 'transparent',
                        color: currentPage === 'report' ? 'white' : '#6b7280',
                        fontWeight: currentPage === 'report' ? 600 : 400
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
                        backgroundColor: currentPage === 'transaction' ? '#14b8a6' : 'transparent',
                        color: currentPage === 'transaction' ? 'white' : '#6b7280',
                        fontWeight: currentPage === 'transaction' ? 600 : 400
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