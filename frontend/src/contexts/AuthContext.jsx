import { createContext, useEffect, useReducer } from "react";

import authReducer from "../reducers/authReducer";

const AuthContext = createContext(undefined);

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
    loading: true,
	});

	useEffect(() => {
		const item = localStorage.getItem("user");
		const user = item ? JSON.parse(item) : null;

		if (user) {
			dispatch({ type: "LOGIN", payload: user });
		}

    dispatch({ type: "SET_LOADING", payload: false });
	}, []);

	useEffect(() => {
		if (state.user) {
			localStorage.setItem("user", JSON.stringify(state.user));
		} else {
			localStorage.removeItem("user");
		}
	}, [state.user]);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
