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
	// ScrollArea, // Removed ScrollArea in favor of flex-1 with overflow on Paper
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

	// --- Validation Check for Payment Step ---
	const isPaymentFormValid = useMemo(() => {
		const { cardNumber, expirationDate, cvv, cardholderName } = formData;
		return (
			cardNumber.replace(/\s/g, '').length === 16 && // Checks for 16 digits
			expirationDate.length === 5 && // Checks for MM/YY format length
			cvv.length >= 3 && // Checks for 3 or 4 digits
			cardholderName.trim().length > 0
		);
	}, [formData]);
	// -----------------------------------------


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

		// Add final check before processing
		if (!isPaymentFormValid) {
			alert("Please fill in all required payment fields correctly.");
			return;
		}

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
			// Main container: full height, centered horizontally
<div className="flex flex-col items-center h-full p-6 text-center mt-20"> 
    {/* ICON */}
    <CircleCheck
        size={150}
        strokeWidth={1.5}
        color="teal"
        className="mb-8"
    />

    <Title order={1} className="text-teal-700 mt-6">
        Payment Successful!
    </Title>

    <Text className="max-w-md mt-10 text-lg mb-4">
        Thank you for your payment of <strong>${totalFees.toFixed(2)}</strong>.  
        A receipt has been sent to <strong>{user?.email}</strong>.
    </Text>

    <Button 
        component={Link}
        to="/dashboard"
        color="teal"
        size="lg"
        className="mt-9 mb-5"
    >
        Back to Dashboard
    </Button>
</div>

		);
	}

	return (
    <div className="flex flex-col h-full bg-transparent"> {/* Outer container now full width */}
			{currentStep === "overview" ? (
				<>
					{/* Main Content Area (This one has shadow="xs" and rounded-xl) */}
					<Paper 
						withBorder 
						shadow="xs" 
						className="p-5 rounded-xl bg-white flex-1 overflow-auto" // Added flex-1 and overflow-auto
					>
						<Stack spacing="lg"> 
							<Stack gap={2}>
								<Title order={3} className="text-gray-800">
									Select Fees to Pay
								</Title>
								<Text c="dimmed">
									Check the books you wish to pay for below.
								</Text>
							</Stack>

							{/* Removed Divider */}

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
						</Stack>
					</Paper>

					{/* Fee Summary (Now matching the shadow and border radius of the main Paper) */}
					<Paper 
						withBorder 
                        shadow="xs" // Added shadow prop
						className="p-5 bg-teal-50 rounded-xl mt-4" // Matched padding p-5
					>
						<Group justify="space-between" align="center" >
							<Group>
								<Text fw={600} size="lg">
									Selected Fees Due:
								</Text>
								<Text fw={700} size="xl" className="text-red-600">
									${totalFees.toFixed(2)}
								</Text>
							</Group>
							<Button
								color="teal"
								size="lg"
								onClick={handleProceedToPayment}
								disabled={selectedBookIds.length === 0}
							>
								Proceed to Payment
							</Button>
						</Group>
					</Paper>
				</>
			) : (
				// PAYMENT STEP (Refactored for full width white boxes and footer button)
				<div className="flex flex-col flex-1">
					{/* 1. Header and Back Button Wrapped in White Paper Box */}
					<Paper 
						withBorder 
						shadow="xs" 
						className="p-5 rounded-xl bg-white mb-4" 
					>
						<Group justify="space-between" align="center">
              <Stack gap={2}>
								<Title order={3} className="text-gray-800">
									Enter Payment Details
								</Title>
								<Text c="dimmed">
									Enter your preferred method of payment.
								</Text>
							</Stack>
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
					</Paper>

					{/* 2. Two-Column Content (Group grow) */}
					<Group grow className="flex-1"> 
						{/* Left Column: Fee Summary Table (Styled like Overview Paper) */}
						<Paper 
							withBorder 
							shadow="xs" 
							className="p-5 rounded-xl bg-white flex-1 h-full"
						>
							<Stack spacing="md" className="h-full"> {/* Added h-full here to ensure the inner content tries to fill space */}
								<Text fw={600} size="lg">
									Items to Pay:
								</Text>
								<Table
									striped
									withColumnBorders
									withTableBorder
									className="rounded-lg shadow-sm"
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
							</Stack>
						</Paper>

						{/* Right Column: Payment Form (Styled like Overview Paper) */}
						<Paper 
							withBorder 
							shadow="xs" 
							className="p-5 rounded-xl bg-white flex-1 flex flex-col justify-between h-full"
						>
							<form onSubmit={handlePayNow} className="flex flex-col flex-1">
								<Stack className="flex-1">
									<Title order={4}>
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
											error={formData.cardNumber.length > 0 && formData.cardNumber.replace(/\s/g, '').length < 16 ? "Card number must be 16 digits" : null}
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
												error={formData.expirationDate.length > 0 && formData.expirationDate.length < 5 ? "Must be MM/YY" : null}
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
												error={formData.cvv.length > 0 && formData.cvv.length < 3 ? "Must be 3 or 4 digits" : null}
											/>
										</Group>
										<TextInput
											label="Cardholder Name"
											name="cardholderName"
											value={formData.cardholderName}
											onChange={handleInputChange}
											placeholder="John Doe"
											required
											error={formData.cardholderName.length > 0 && formData.cardholderName.trim().length === 0 ? "Cardholder name is required" : null}
										/>
									</div>
								</Stack>
								{/* Submit button removed from form and moved to footer */}
							</form>
						</Paper>
					</Group>

					{/* 3. Footer Summary Paper (Pay Now Button) */}
					<Paper 
						withBorder 
                        shadow="xs" 
						className="p-5 bg-teal-50 rounded-xl mt-4" 
					>
						<Group justify="space-between" align="center" >
							<Group>
								<Text fw={600} size="lg">
									Total Payment Due:
								</Text>
								<Text fw={700} size="xl" className="text-red-600">
									${totalFees.toFixed(2)}
								</Text>
							</Group>
							<Button
								type="button" 
								color="teal"
								size="lg"
								onClick={handlePayNow} 
								disabled={!isPaymentFormValid}
							>
								Pay Now
							</Button>
						</Group>
					</Paper>
				</div>
			)}
		</div>
	);
}