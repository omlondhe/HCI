import React, { useRef, useState } from "react";
import Input from "../Input";
import { ILogInProps } from "./types";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import sha256 from "crypto-js/sha256";
import { IUser } from "../Register/types";

const Login: React.FC<ILogInProps> = ({ user, setUser, setTab }) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggingIn, setLoggingIn] = useState(false);

	const clearForm = () => {
		setUsername("");
		setPassword("");
	};

	const login = async () => {
		setLoggingIn(true);
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;

		if (user) {
			toast.error("You are already logged in!");
		} else if (!username) {
			toast.error("Username is required");
		} else if (!password) {
			toast.error("Password is required");
		} else {
			try {
				const queryRef = query(
					collection(db, "users"),
					where("username", "==", username)
				);
				const documentRef = await getDocs(queryRef);
				if (!documentRef.docs.length) {
					toast.error("The username does not exist");
					setLoggingIn(false);
					return;
				}

				const document = documentRef.docs[0];
				if (document.data().password !== sha256(password).toString()) {
					toast.error("Wrong password");
					setLoggingIn(false);
					return;
				}

				if (!document.data()) {
					toast.error("User not found");
					setLoggingIn(false);
					return;
				}

				setUser(document.data() as IUser);
				setTab("dashboard");
				localStorage.setItem("user", JSON.stringify(document.data()));
			} catch (error) {
				console.error("Error occurred while getting user: ", error);
			}
		}

		setLoggingIn(false);
	};

	return (
		<section className="h-screen w-screen grid place-items-center">
			<div className="w-full max-w-xl p-10 rounded-xl border dark:border-0 bg-[#f9f9f9] dark:bg-[#212121]">
				<header className="mb-10 border-b pb-5">
					<h1 className="text-xl font-semibold">Login</h1>
				</header>
				<div className="flex flex-col gap-8 ">
					<div className="">
						<Input
							ref={usernameRef}
							label="Username"
							prefix="@"
							placeholder="omlondhe2133"
							value={username}
							setValue={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="">
						<Input
							ref={passwordRef}
							label="Password"
							placeholder="**********"
							value={password}
							isPassword={true}
							setValue={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<footer className="mt-10 justify-between flex">
					<div
						className="grid place-items-center cursor-pointer"
						onClick={() => setTab("register")}
					>
						<span className="text-sm">
							&larr;&nbsp;&nbsp;Register if not already
						</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							className="text-sm hover:ring-0 hover:outline-none hover:border-0 outline-none focus:ring-0 focus:border-0 focus:outline-none bg-[#dfdfdf] hover:bg-[#dfdfdf]/90 focus:bg-[#dfdfdf]/90 dark:bg-[#303030] hover:dark:bg-[#303030]/90 focus:dark:bg-[#303030]/90 px-5 py-2 rounded-lg"
							onClick={clearForm}
						>
							Clear
						</button>
						<button
							className="relative text-white group whitespace-nowrap overflow-hidden flex gap-2 w-[85px] hover:w-[100px] focus:w-[100px] transition-all duration-300 text-sm hover:ring-0 hover:outline-none hover:border-0 outline-none focus:ring-0 focus:border-0 focus:outline-none bg-orange-600 hover:bg-orange-600/90 focus:bg-orange-600/90 px-5 py-2 rounded-lg"
							onClick={login}
						>
							<span>Log in</span>
							<span className="group-hover:text-white group-focus:text-white text-transparent translate-x-10 group-hover:translate-x-0 group-focus:translate-x-0 transition-all duration-300">
								&rarr;
							</span>
							{loggingIn && (
								<span className="absolute top-0 left-0 w-full h-full bg-orange-600 grid place-items-center">
									<div className="flex items-center gap-1">
										<span className="bg-white animate-ping h-2 w-2 rounded-xl " />
										<span className="bg-white animate-ping h-2 w-2 rounded-xl " />
										<span className="bg-white animate-ping h-2 w-2 rounded-xl " />
									</div>
								</span>
							)}
						</button>
					</div>
				</footer>
			</div>
		</section>
	);
};

export default Login;
