import { useState } from "react";
import {
	Card,
	Autocomplete,
	TextInput,
	Select,
	Textarea,
	Button,
	Stack,
	Text,
	Alert,
	Group,
	Box,
	Table,
	Badge,
} from "@mantine/core";
import {
	AlertCircle,
	CheckCircle2,
	AlertTriangle,
	XCircle,
} from "lucide-react";
import MOCK_BOOKS from "../assets/data/MockBooks";
import { useNavigate } from "react-router";

const Report = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		bookId: "",
		bookTitle: "",
		bookAuthor: "",
		status: "",
		description: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const [submittedBookTitle, setSubmittedBookTitle] = useState("");
	const [errors, setErrors] = useState([]);
	const [reports, setReports] = useState([]);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		const validationErrors = [];

		if (!formData.bookTitle.trim())
			validationErrors.push("Book title is required");
		if (!formData.bookAuthor.trim())
			validationErrors.push("Book author is required");
		if (!formData.status) validationErrors.push("Status is required");
		if (!formData.description.trim())
			validationErrors.push("Description is required");

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setSubmitted(false);
			return;
		}

		// Build a full report object
		const newReport = {
			id: Date.now().toString(),
			bookId: formData.bookId || "",
			bookTitle: formData.bookTitle,
			bookAuthor: formData.bookAuthor,
			status: formData.status,
			description: formData.description,
			reportedBy: "You",
			reportedDate: new Date().toISOString(),
		};

		// Store book title before clearing
		setSubmittedBookTitle(formData.bookTitle);

		// call optional external handler
		if (typeof onSubmit === "function") onSubmit(newReport);

		// add to internal list
		setReports((prev) => [newReport, ...prev]);
		setFormData({
			bookId: "",
			bookTitle: "",
			bookAuthor: "",
			status: "",
			description: "",
		});
		setErrors([]);
		setSubmitted(true);
	};

	const handleClear = () => {
		setFormData({
			bookId: "",
			bookTitle: "",
			bookAuthor: "",
			status: "",
			description: "",
		});
		setErrors([]);
	};

	const bookTitleOptions = MOCK_BOOKS.map((b) => b.title).sort();

	// Show success screen if submitted
	if (submitted) {
		return (
			<Card
				className="h-auto min-h-full flex items-center justify-center"
				withBorder
			>
				<Stack
					gap="xl"
					align="center"
					style={{ maxWidth: "600px", textAlign: "center" }}
				>
					<Box
						style={{
							width: "100px",
							height: "100px",
							borderRadius: "50%",
							background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
						}}
					>
						<CheckCircle2 size={60} style={{ color: "#059669" }} />
					</Box>

					<Stack gap="md" align="center">
						<Text size="xl" fw={600} style={{ color: "#1f2937" }}>
							Report Successfully Submitted!
						</Text>

						<Text size="md" c="dimmed" style={{ lineHeight: 1.6 }}>
							Your report for <strong>{submittedBookTitle}</strong> was
							successfully submitted! A confirmation email was sent to your
							inbox and further updates about next steps including potential
							reimbursement will be sent via email.
						</Text>
					</Stack>

					<Group position="center" spacing="md" mt="md">
						<Button
							onClick={() => navigate("/")}
						>
							Return to Homepage
						</Button>

						<Button
							onClick={() => setSubmitted(false)}
						>
							Submit Another Report
						</Button>
					</Group>
				</Stack>
			</Card>
		);
	}

	return (
		<Card className="h-auto min-h-full flex" withBorder>
			<Stack className="flex-1" gap="lg">
				<div>
					<Text size="xl" fw={600} mb={4} style={{ color: "#1f2937" }}>
						Report Lost or Damaged Book
					</Text>
					<Text size="sm" c="dimmed">
						Fill out the form below to report a lost or damaged library book
					</Text>
				</div>

				{errors.length > 0 && (
					<Alert
						color="red"
						title="Please fix the following errors:"
						icon={<AlertCircle size={16} />}
						styles={{
							root: {
								backgroundColor: "#fef2f2",
								borderColor: "#fca5a5",
							},
						}}
					>
						<ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</Alert>
				)}

				<form onSubmit={handleSubmit}>
					<Stack gap="md">
						<Group grow>
							<Autocomplete
								label="Book Title"
								placeholder="Type or select a book title"
								data={bookTitleOptions}
								value={formData.bookTitle}
								onChange={(val) => {
									// update title
									setFormData((prev) => ({ ...prev, bookTitle: val }));
									// if the typed value matches an existing title, autofill author and id
									const match = MOCK_BOOKS.find(
										(b) => b.title.toLowerCase() === val.trim().toLowerCase()
									);
									if (match) {
										setFormData((prev) => ({
											...prev,
											bookAuthor: match.author || prev.bookAuthor,
											bookId: match.isbn || prev.bookId,
										}));
									}
								}}
								required
								size="md"
								styles={{
									input: {
										borderColor: "#d1d5db",
										"&:focus": {
											borderColor: "#14b8a6",
										},
									},
								}}
							/>

							<TextInput
								label="Author"
								placeholder="Enter author name"
								value={formData.bookAuthor}
								onChange={(e) =>
									setFormData({ ...formData, bookAuthor: e.target.value })
								}
								required
								size="md"
								styles={{
									input: {
										borderColor: "#d1d5db",
										"&:focus": {
											borderColor: "#14b8a6",
										},
									},
								}}
							/>
						</Group>

						<Group grow>
							<TextInput
								label="Book ID / ISBN (Optional)"
								placeholder="Enter book ID or ISBN if known"
								value={formData.bookId}
								onChange={(e) =>
									setFormData({ ...formData, bookId: e.target.value })
								}
								size="md"
								styles={{
									input: {
										borderColor: "#d1d5db",
										"&:focus": {
											borderColor: "#14b8a6",
										},
									},
								}}
							/>

							<Select
								label="Status"
								placeholder="Select status"
								value={formData.status}
								onChange={(value) =>
									setFormData({ ...formData, status: value })
								}
								data={[
									{ value: "lost", label: "Lost" },
									{ value: "damaged", label: "Damaged" },
								]}
								required
								size="md"
								styles={{
									input: {
										borderColor: "#d1d5db",
										"&:focus": {
											borderColor: "#14b8a6",
										},
									},
								}}
							/>
						</Group>

						<Textarea
							label="Description"
							placeholder="Please provide details about the condition or circumstances..."
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							minRows={4}
							required
							size="md"
							styles={{
								input: {
									borderColor: "#d1d5db",
									"&:focus": {
										borderColor: "#14b8a6",
									},
								},
							}}
						/>

						<Group mt="md">
							<Button
								type="submit"
								style={{
									flex: 1,
								}}
							>
								Submit Report
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={handleClear}
							>
								Clear Form
							</Button>
						</Group>
					</Stack>
				</form>

				<Card className="flex-1" withBorder>
					<Stack gap="lg">
						<div>
							<Text size="xl" fw={600} mb={4} style={{ color: "#1f2937" }}>
								Reported Issues
							</Text>
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
								<Table
									striped
									highlightOnHover
									styles={{
										table: {
											borderCollapse: "collapse",
										},
										th: {
											backgroundColor: "#f9fafb",
											color: "#374151",
											padding: "12px 16px",
										},
										td: {
											padding: "12px 16px",
											color: "#4b5563",
										},
									}}
								>
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
														color={report.status === "lost" ? "red" : "orange"}
														variant="light"
														leftSection={
															report.status === "lost" ? (
																<XCircle size={12} />
															) : (
																<AlertTriangle size={12} />
															)
														}
														style={{
															backgroundColor:
																report.status === "lost"
																	? "#fef2f2"
																	: "#fff7ed",
															color:
																report.status === "lost"
																	? "#dc2626"
																	: "#ea580c",
														}}
													>
														{report.status === "lost" ? "Lost" : "Damaged"}
													</Badge>
												</Table.Td>
												<Table.Td>{report.reportedBy}</Table.Td>
												<Table.Td>
													{new Date(report.reportedDate).toLocaleDateString()}
												</Table.Td>
												<Table.Td style={{ maxWidth: "300px" }}>
													<Text lineClamp={2} size="sm">
														{report.description}
													</Text>
												</Table.Td>
											</Table.Tr>
										))}
									</Table.Tbody>
								</Table>
							</Table.ScrollContainer>
						)}
					</Stack>
				</Card>
			</Stack>
		</Card>
	);
};

export default Report;
