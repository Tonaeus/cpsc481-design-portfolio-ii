import books from "../database/book_info.json"
import bookCopies from "../database/book_copies.json"
import users from "../database/users.json"

const getTransactionsWithBookInfo = (email) => {
  const user = users.find(u => u.email === email);
  if (!user) return [];

  return user.transactions.map(tx => {
    const copy = bookCopies.find(c => c.copy_id === tx.copy_id);
    const book = books.find(b => b.id === copy.book_id);
    
    return {
      ...tx,
      book: { ...book },
      copy: { ...copy }
    };
  });
};

export {
  getTransactionsWithBookInfo,
}
