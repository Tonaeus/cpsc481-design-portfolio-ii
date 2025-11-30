import { useState, useMemo, useCallback } from "react";
import {
  Button,
  Stack,
  Title,
  Text,
  Group,
  Table,
  TextInput,
  Divider,
  Checkbox,
  ScrollArea,
} from "@mantine/core";
import { CreditCard, Check, MoveLeft } from "lucide-react";
import { Link } from "react-router";

const overdueBooks = [
  { id: "1", title: "The Great Gatsby", dueDate: "2025-10-01", feeAmount: 3.5 },
  { id: "2", title: "To Kill a Mockingbird", dueDate: "2025-10-05", feeAmount: 5.0 },
  { id: "3", title: "1984", dueDate: "2025-10-08", feeAmount: 4.25 },
  { id: "4", title: "Pride and Prejudice", dueDate: "2025-10-10", feeAmount: 2.75 },
  { id: "5", title: "The Catcher in the Rye", dueDate: "2025-10-12", feeAmount: 6.0 },
];

export default function Payment() {
  const [currentStep, setCurrentStep] = useState("overview");
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
  });

  const selectedBooks = overdueBooks.filter((b) => selectedBookIds.includes(b.id));
  const totalFees = useMemo(() => selectedBooks.reduce((s, b) => s + b.feeAmount, 0), [selectedBooks]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  let formatted = value;

  if (name === "cardNumber") {
    // Only numbers, limit to 16 digits
    formatted = value.replace(/\D/g, "").slice(0, 16);
    // Add space every 4 digits
    formatted = formatted.replace(/(.{4})/g, "$1 ").trim();
  } 
  
  else if (name === "expirationDate") {
    // Only numbers, insert slash after 2 digits
    formatted = value.replace(/\D/g, "").slice(0, 4);
    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    }
  } 
  
  else if (name === "cvv") {
    // Only numbers, limit to 4 digits
    formatted = value.replace(/\D/g, "").slice(0, 4);
  }

  setFormData((prev) => ({ ...prev, [name]: formatted }));
};

  const handleToggleBook = useCallback((id) => {
    setSelectedBookIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleProceedToPayment = () => setCurrentStep("payment");
  const handleBackToOverview = () => setCurrentStep("overview");
  const handlePayNow = (e) => {
    e.preventDefault();
    setCurrentStep("confirmation");
  };

  if (currentStep === "confirmation") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Check size={40} color="teal" strokeWidth={2} />
        <Title order={2} className="text-teal-700 mt-4">
          Payment Successful!
        </Title>
        <Text c="dimmed" className="max-w-sm mt-2">
          Thank you for your payment of ${totalFees.toFixed(2)}. A receipt has been sent to your email.
        </Text>
        <Button component={Link} to="/menu" color="teal" className="mt-6">
          Back to Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 bg-transparent">
      {currentStep === "overview" ? (
        <>
          <ScrollArea className="flex-1">
            <Stack spacing="lg">
              <Stack gap={2}>
                <Title order={3} className="text-gray-800">Select Fees to Pay</Title>
                <Text c="dimmed">Check the books you wish to pay for below.</Text>
              </Stack>

              <Divider />

              <Table
                striped
                highlightOnHover
                withColumnBorders
                className="w-full text-base"
                style={{ tableLayout: "fixed" }}
              >
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-700 text-sm font-semibold uppercase tracking-wide">
                    <th className="px-4 py-3 text-center" style={{ width: "10%" }}>Select</th>
                    <th className="px-4 py-3" style={{ width: "50%" }}>Book Title</th>
                    <th className="px-4 py-3" style={{ width: "20%" }}>Due Date</th>
                    <th className="px-4 py-3 text-right" style={{ width: "20%" }}>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-teal-50 transition-all">
                      <td className="px-4 py-3 text-center align-middle">
                        <Checkbox
                          checked={selectedBookIds.includes(book.id)}
                          onChange={() => handleToggleBook(book.id)}
                          color="teal"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 align-middle">{book.title}</td>
                      <td className="px-4 py-3 text-gray-600 align-middle">{book.dueDate}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-700 align-middle">
                        ${book.feeAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Divider />

              <Group justify="space-between" className="p-4 bg-teal-50 rounded-lg">
                <Text fw={500} size="lg">Selected Fees Due:</Text>
                <Text fw={700} size="xl" className="text-teal-700">
                  ${totalFees.toFixed(2)}
                </Text>
              </Group>
            </Stack>
          </ScrollArea>

          {/* Sticky Bottom Button */}
          <div className="bg-transparent p-4 flex justify-end mt-2">
            <Button
              color="teal"
              size="lg"
              onClick={handleProceedToPayment}
              disabled={selectedBookIds.length === 0}
            >
              Proceed to Payment
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* --- Enter Payment Details (No Scroll, Flat Design) --- */}
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <Group justify="space-between" align="center" mb="md">
                <Title order={3}>Enter Payment Details</Title>
                <Button
                  variant="outline"
                  color="gray"
                  leftSection={<MoveLeft size={18} color="teal" />}
                  onClick={handleBackToOverview}
                >
                  Back
                </Button>
              </Group>

              <Text c="dimmed" mb="sm">
                Total due: <b className="text-teal-600">${totalFees.toFixed(2)}</b> for {selectedBooks.length} book(s).
              </Text>

              <Table
                striped
                className="w-full text-base mb-4"
                style={{ tableLayout: "fixed" }}
              >
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-700 text-sm font-semibold uppercase tracking-wide">
                    <th className="px-4 py-2" style={{ width: "70%" }}>Book Title</th>
                    <th className="px-4 py-2 text-right" style={{ width: "30%" }}>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBooks.map((b) => (
                    <tr key={b.id} className="hover:bg-teal-50 transition-all">
                      <td className="px-4 py-2 font-medium text-gray-800 align-middle">{b.title}</td>
                      <td className="px-4 py-2 text-right font-semibold text-gray-700 align-middle">
                        ${b.feeAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Title order={4} className="mb-2">Card Information</Title>

              <div className="grid grid-cols-1 gap-3">
                <TextInput
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  leftSection={<CreditCard size={18} color="teal" />}
                  required
                  inputMode="numeric"
                  maxLength={19}
                />

                <Group grow>
                  <TextInput
                    label="Expiration Date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    inputMode="numeric"
                    maxLength={5}
                  />
                  <TextInput
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    inputMode="numeric"
                    maxLength={4}
                  />
                </Group>
                <TextInput label="Cardholder Name" name="cardholderName" value={formData.cardholderName} onChange={handleInputChange} placeholder="John Doe" required />
              </div>
            </div>

            {/* Sticky Pay Button */}
            <div className="mt-6 flex justify-end bg-transparent">
              <Button type="submit" color="teal" size="lg" onClick={handlePayNow}>
                Pay Now
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
