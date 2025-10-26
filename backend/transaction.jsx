import books from "../database/book_info.json";
import bookCopies from "../database/book_copies.json";
import users from "../database/users.json";

const getUser = (email) => {
	const user = users.find((u) => u.email === email);
	return user ? user : {};
};

const getUsers = () => {
	return users.map((u) => u.email);
};

const getAllBookCopiesWithUser = () => {
	return bookCopies.map((copy) => {
		const book = books.find((b) => b.id === copy.book_id);

		const currentUser = users.find((u) =>
			u.transactions?.some(
				(t) =>
					t.copy_id === copy.copy_id &&
					["Borrowed", "Overdue", "Reserved"].includes(t.status)
			)
		);

		const userInfo = currentUser
			? {
					id: currentUser.id,
					first_name: currentUser.first_name,
					last_name: currentUser.last_name,
					email: currentUser.email,
					transaction: currentUser.transactions.find(
						(t) =>
							t.copy_id === copy.copy_id &&
							["Borrowed", "Overdue", "Reserved"].includes(t.status)
					),
			  }
			: null;

		return {
			...copy,
			book_info: book || null,
			current_user: userInfo,
		};
	});
};

export { getUser, getUsers, getAllBookCopiesWithUser };
