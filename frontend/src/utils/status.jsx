const getStatusColor = (status) => {
	switch (status) {
		case "Available":
			return "green";
		case "Borrowed":
			return "orange";
		case "Overdue":
			return "red";
		case "Returned":
			return "green";
		case "Reserved":
			return "violet";
		case "Lost":
			return "gray";
		default:
			return "dark";
	}
};

export { getStatusColor };
