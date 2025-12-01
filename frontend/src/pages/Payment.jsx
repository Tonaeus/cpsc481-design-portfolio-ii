import { useState, useMemo, useCallback, useEffect } from "react";
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
	Loader,
	Center,
	Paper,
} from "@mantine/core";
import { CreditCard, CircleCheck, MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

import useAuthContext from "../hooks/useAuthContext";
import { getTransactionsWithBookInfo } from "../../backend/history.jsx";

export default function Payment() {
	const { state } = useAuthContext();
	const { user, loading } = state;
	const navigate = useNavigate();

	// 2. State for Transactions and UI
	const [transactions, setTransactions] = useState([]);
	const [currentStep, setCurrentStep] = useState("overview");
	const [selectedBookIds, setSelectedBookIds] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
	const [formData, setFormData] = useState({
		cardNumber: "",
		expirationDate: "",
		cvv: "",
		cardholderName: "",
	});

	useEffect(() => {
		if (!loading && !user) {
			navigate("/account");
		} else if (!loading && user?.email) {
			const data = getTransactionsWithBookInfo(user.email);
			setTransactions(data);
		}
	}, [loading, user, navigate]);

	const overdueBooks = useMemo(() => {
		const feeRate = 0.5;
		const today = new Date();

		return transactions
			.filter((tx) => tx.status === "Overdue")
			.map((tx) => {
				const dueDate = new Date(tx.due_date);
				let fee = 0;

				if (dueDate < today) {
					const daysOverdue = Math.ceil(
						(today - dueDate) / (1000 * 60 * 60 * 24)
					);
					fee = daysOverdue * feeRate;
				}

				return {
					id: tx.transaction_id,
					title: tx.book.title,
					dueDate: tx.due_date,
					feeAmount: fee,
				};
			})
			.filter((book) => book.feeAmount > 0); 
	}, [transactions]);

	const selectedBooks = overdueBooks.filter((b) =>
		selectedBookIds.includes(b.id)
	);

	const totalFees = useMemo(
		() => selectedBooks.reduce((s, b) => s + b.feeAmount, 0),
		[selectedBooks]
	);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let formatted = value;

		if (name === "cardNumber") {
			formatted = value.replace(/\D/g, "").slice(0, 16);
			formatted = formatted.replace(/(.{4})/g, "$1 ").trim();
		} else if (name === "expirationDate") {
			formatted = value.replace(/\D/g, "").slice(0, 4);
			if (formatted.length > 2) {
				formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
			}
		} else if (name === "cvv") {
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
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setCurrentStep("confirmation");
        }, 1500); 
	};

	if (loading) {
		return (
			<Center h="100%">
				<Loader color="teal" />
			</Center>
		);
	}

    if (isProcessing) {
        return (
			<Center h="100%" className="flex flex-col">
                <Loader color="teal" size="xl" />
                <Title order={3} mt="md" c="teal">Processing Payment...</Title>
                <Text c="dimmed" mt="xs">Do not close this window.</Text>
			</Center>
        );
    }

	if (currentStep === "confirmation") {
		return (
			<div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <CircleCheck
            size={70}
            strokeWidth={1.5}
            color="teal"  
            className="mb-2"
        />
				<Title order={2} className="text-teal-700 mt-4">
					Payment Successful!
				</Title>
				<Text c="dimmed" className="max-w-sm mt-2">
					Thank you for your payment of ${totalFees.toFixed(2)}. A receipt has
					been sent to {user?.email}.
				</Text>
				<Button 
                    component={Link} 
                    to="/dashboard" 
                    color="teal" 
                    size="lg" 
                    className="mt-6"
                >
					Back to Dashboard
				</Button>
			</div>
		);
	}

	return (
    <div className="flex flex-col h-full px-6 py-4 bg-transparent max-w-5xl mx-auto">
			{currentStep === "overview" ? (
				<>
					<ScrollArea className="flex-1">
            <Paper withBorder shadow="xs" className="p-5 rounded-xl bg-white">
						<Stack spacing="lg">
							<Stack gap={2}>
								<Title order={3} className="text-gray-800">
									Select Fees to Pay
								</Title>
								<Text c="dimmed">
									Check the books you wish to pay for below.
								</Text>
							</Stack>

							<Divider />

							{overdueBooks.length > 0 ? (
              <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                  className="w-full text-base rounded-lg overflow-hidden shadow-sm"
              >
                  <thead style={{ background: "var(--mantine-color-teal-filled)" }}>
                      <tr className="text-left text-gray-700 text-sm font-semibold uppercase tracking-wide">
                          <th className="px-4 py-3 text-center">Select</th>
                          <th className="px-4 py-3">Book Title</th>
                          <th className="px-4 py-3">Due Date</th>
                          <th className="px-4 py-3 text-right">Fee</th>
                      </tr>
                  </thead>

                  <tbody>
                      {overdueBooks.map((book) => (
                          <tr
                              key={book.id}
                              className="transition-all border-b last:border-none hover:bg-teal-50"
                          >
                              <td className="px-4 py-3 text-center">
                                  <Checkbox
                                      checked={selectedBookIds.includes(book.id)}
                                      onChange={() => handleToggleBook(book.id)}
                                      color="teal"
                                  />
                              </td>

                              <td className="px-4 py-3 font-medium text-gray-900">
                                  {book.title}
                              </td>

                              <td className="px-4 py-3 text-gray-600">
                                  {book.dueDate}
                              </td>

                              <td className="px-4 py-3 text-right font-semibold text-red-600">
                                  ${book.feeAmount.toFixed(2)}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
							) : (
								<div className="py-10 text-center">
									<Text c="dimmed">You have no overdue fees! 🎉</Text>
									<Button
										component={Link}
										to="/dashboard"
										variant="subtle"
										color="teal"
										mt="md"
									>
										Return to Dashboard
									</Button>
								</div>
							)}

							<Divider />

							<Paper 
                                withBorder 
                                shadow="xs" 
                                className="p-4 bg-teal-50 rounded-lg"
                            >
								<Group justify="space-between" >
									<Text fw={500} size="lg">
										Selected Fees Due:
									</Text>
									<Text fw={700} size="xl" className="text-red-600">
										${totalFees.toFixed(2)}
									</Text>
								</Group>
                            </Paper>
						</Stack>
            </Paper>
					</ScrollArea>

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
					<div className="flex flex-col flex-1 justify-between">
						<div>
							<Group justify="space-between" align="center" mb="md">
								<Title order={3}>Enter Payment Details</Title>
								<Button
									variant="outline"
									color="teal" 
                                    size="md"
									leftSection={<MoveLeft size={18} color="teal" />}
									onClick={handleBackToOverview}
								>
									Back to Overview
								</Button>
							</Group>

							<Text c="dimmed" mb="sm">
								Total due: <b className="text-red-600">${totalFees.toFixed(2)}</b>{" "}
								for {selectedBooks.length} book(s).
							</Text>

              <Table
                  striped
                  withColumnBorders
                  withTableBorder
                  className="rounded-lg shadow-sm mb-4"
              >
                  <thead style={{ background: "var(--mantine-color-teal-filled)" }}>
                      <tr className="text-left text-gray-700 text-sm font-semibold uppercase tracking-wide">
                          <th className="px-4 py-3">Book Title</th>
                          <th className="px-4 py-3 text-right">Fee</th>
                      </tr>
                  </thead>
                  <tbody>
                      {selectedBooks.map((b) => (
                          <tr key={b.id} className="hover:bg-teal-50 border-b last:border-none">
                              <td className="px-4 py-3 font-medium text-gray-900">
                                  {b.title}
                              </td>
                              <td className="px-4 py-3 text-right font-semibold text-red-600">
                                  ${b.feeAmount.toFixed(2)}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>

							<Title order={4} className="mb-2">
								Card Information
							</Title>

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
								<TextInput
									label="Cardholder Name"
									name="cardholderName"
									value={formData.cardholderName}
									onChange={handleInputChange}
									placeholder="John Doe"
									required
								/>
							</div>
						</div>

						<div className="mt-6 flex justify-end bg-transparent">
							<Button 
                                type="submit" 
                                color="teal" 
                                size="lg" 
                                onClick={handlePayNow}
                            >
								Pay Now
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}