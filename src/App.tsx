import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { IUser } from "./components/Register/types";
import "react-toastify/dist/ReactToastify.min.css";
import Animator from "./components/Animator";
import Dashboard from "./components/Dashboard";

function App() {
	const [tab, setTab] = useState<"login" | "register" | "dashboard">("login");
	const [user, setUser] = useState<IUser>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const localStorageUser = localStorage.getItem("user");
		if (localStorageUser) {
			const localStorageUserJSON = JSON.parse(localStorageUser);
			setUser(localStorageUserJSON);
			setTab("dashboard");
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		setTab(user ? "dashboard" : "login");
	}, [user]);

	return (
		<>
			<ToastContainer
				hideProgressBar={true}
				bodyClassName={"text-left text-sm"}
				theme="colored"
			/>
			{loading ? (
				<section className="h-screen w-screen grid place-items-center">
					<div className="flex items-center animate-spin dark:bg-white bg-black h-2 rounded-full">
						<div className="h-10 w-10 bg-orange-600 rounded-full animate-ping" />
						<div className="h-10 w-10 bg-orange-600 rounded-full animate-ping" />
						<div className="h-10 w-10 bg-orange-600 rounded-full animate-ping" />
					</div>
				</section>
			) : (
				<AnimatePresence mode="wait">
					{tab === "login" ? (
						<Animator key={"login"}>
							<Login
								user={user}
								setTab={setTab}
								setUser={setUser}
							/>
						</Animator>
					) : tab === "register" ? (
						<Animator key={"register"}>
							<Register
								user={user}
								setTab={setTab}
								setUser={setUser}
							/>
						</Animator>
					) : tab === "dashboard" ? (
						<Dashboard user={user} setUser={setUser} />
					) : null}
				</AnimatePresence>
			)}
		</>
	);
}

export default App;
