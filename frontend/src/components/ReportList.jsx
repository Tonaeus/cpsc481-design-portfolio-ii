import { Paper, Table, Badge, Stack, Text } from '@mantine/core';
import { AlertTriangle, XCircle } from 'lucide-react';

const ReportList = ({ reports }) => {
  return (
    <Paper withBorder shadow="md" p="xl" radius="md" style={{ backgroundColor: 'white' }}>
      <Stack gap="lg">
        <div>
          <Text size="xl" fw={600} mb={4} style={{ color: '#1f2937' }}>Reported Issues</Text>
          <Text size="sm" c="dimmed">
            View all reported lost and damaged books
          </Text>
        </div>

        {reports.length === 0 ? (
          <Text ta="center" c="dimmed" py="xl">
            No reports have been submitted yet.
          </Text>
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover styles={{
              table: {
                borderCollapse: 'collapse'
              },
              th: {
                backgroundColor: '#f9fafb',
                color: '#374151',
                padding: '12px 16px'
              },
              td: {
                padding: '12px 16px',
                color: '#4b5563'
              }
            }}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Book Title</Table.Th>
                  <Table.Th>Author</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Reported By</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Description</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {reports.map((report) => (
                  <Table.Tr key={report.id}>
                    <Table.Td>{report.bookTitle}</Table.Td>
                    <Table.Td>{report.bookAuthor}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={report.status === 'lost' ? 'red' : 'orange'}
                        variant="light"
                        leftSection={
                          report.status === 'lost' ? (
                            <XCircle size={12} />
                          ) : (
                            <AlertTriangle size={12} />
                          )
                        }
                        style={{
                          backgroundColor: report.status === 'lost' ? '#fef2f2' : '#fff7ed',
                          color: report.status === 'lost' ? '#dc2626' : '#ea580c'
                        }}
                      >
                        {report.status === 'lost' ? 'Lost' : 'Damaged'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{report.reportedBy}</Table.Td>
                    <Table.Td>{new Date(report.reportedDate).toLocaleDateString()}</Table.Td>
                    <Table.Td style={{ maxWidth: '300px' }}>
                      <Text lineClamp={2} size="sm">{report.description}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Stack>
    </Paper>
  );
}

export default ReportList;