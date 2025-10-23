import books from "../database/book_info.json"
import bookCopies from "../database/book_copies.json"
import users from "../database/users.json"

const getUser = (email) => {
  const user = users.find(u => u.email === email);
  return user ? user : {};
};

export {
  getUser,
}
