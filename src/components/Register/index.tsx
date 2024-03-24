import React, { useRef, useState } from "react";
import Input from "../Input";
import { IRegisterProps } from "./types";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import sha256 from "crypto-js/sha256";

const Register: React.FC<IRegisterProps> = ({ user, setUser, setTab }) => {
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const bioRef = useRef<HTMLInputElement>(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [bio, setBio] = useState("");
	const [registering, setRegistering] = useState(false);

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setUsername("");
		setPassword("");
		setBio("");
	};

	const register = async () => {
		const doesPasswordIncludeAlphabets = (password: string) => {
			for (let i = 0; i < password.length; i++) {
				if (
					("a" <= password[i] && password[i] <= "z") ||
					("A" <= password[i] && password[i] <= "Z")
				) {
					return true;
				}
			}
			return false;
		};

		const doesPasswordIncludeNumbers = (password: string) => {
			for (let i = 0; i < password.length; i++) {
				if (
					["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
						password[i]
					)
				) {
					return true;
				}
			}
			return false;
		};

		const doesPasswordIncludeSymbols = (password: string) => {
			for (let i = 0; i < password.length; i++) {
				if (
					![
						"0",
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
					].includes(password[i]) &&
					!(
						("a" <= password[i] && password[i] <= "z") ||
						("A" <= password[i] && password[i] <= "Z")
					)
				) {
					console.log(password[i]);
					return true;
				}
			}
			return false;
		};

		setRegistering(true);

		const firstName = firstNameRef.current?.value;
		const lastName = lastNameRef.current?.value;
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;
		const confirmPassword = confirmPasswordRef.current?.value;
		const bio = bioRef.current?.value;

		if (user) {
			toast.error("You are already logged in!");
		} else if (!firstName) {
			toast.error("First name is required");
		} else if (firstName.length < 2) {
			toast.error("First name must be at least 2 characters long");
		} else if (!lastName) {
			toast.error("Last name is required");
		} else if (lastName.length < 2) {
			toast.error("Last name must be at least 2 characters long");
		} else if (!username) {
			toast.error("Username is required");
		} else if (username.length < 5) {
			toast.error("Username must be at least 5 characters long");
		} else if (!password) {
			toast.error("Password is required");
		} else if (password.length < 8) {
			toast.error("Password must be at least 8 characters long");
		} else if (!doesPasswordIncludeAlphabets(password)) {
			toast.error("Password must contain alphabets");
		} else if (!doesPasswordIncludeNumbers(password)) {
			toast.error("Password must contain numbers");
		} else if (!doesPasswordIncludeSymbols(password)) {
			toast.error("Password must contain symbols");
		} else if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else if (bio?.length && bio.length < 10) {
			toast.error("Bio must be at least 10 characters long");
		} else {
			try {
				const queryRef = query(
					collection(db, "users"),
					where("username", "==", username)
				);
				const documentRef = await getDocs(queryRef);
				if (documentRef.size || documentRef.docs.length) {
					toast.error("The username already exist");
					setRegistering(false);
					return;
				}
			} catch (error) {
				console.error("Error occurred while getting user: ", error);
			}

			try {
				const user = {
					firstName,
					lastName,
					username,
					password: sha256(password).toString(),
					bio: bio ?? "",
				};
				const collectionRef = collection(db, "users");
				const documentRef = await addDoc(collectionRef, user);
				console.log("User saved: ", documentRef);
				setUser(user);
				setTab("dashboard");
				localStorage.setItem("user", JSON.stringify(user));
			} catch (error) {
				console.error("Error occurred while saving user: ", error);
			}
		}

		setRegistering(false);
	};

	return (
		<section className="h-screen w-screen grid place-items-center overflow-hidden">
			<div className="w-full max-w-xl p-10 rounded-xl border dark:border-0 overflow-hidden bg-[#f9f9f9] dark:bg-[#212121]">
				<header className="mb-10 border-b pb-5">
					<h1 className="text-xl font-semibold">Register</h1>
				</header>
				<div className="flex flex-col gap-8">
					<div className="flex gap-8">
						<div className="flex-1">
							<Input
								ref={firstNameRef}
								label="First name *"
								placeholder="Om"
								value={firstName}
								setValue={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="flex-1">
							<Input
								ref={lastNameRef}
								label="Last name *"
								placeholder="Londhe"
								value={lastName}
								setValue={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex-1">
						<Input
							ref={usernameRef}
							label="Username *"
							prefix="@"
							placeholder="omlondhe2133"
							value={username}
							setValue={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex-1">
						<Input
							ref={passwordRef}
							label="Password *"
							placeholder="**********"
							value={password}
							isPassword={true}
							setValue={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex-1">
						<Input
							ref={confirmPasswordRef}
							label="Confirm Password *"
							placeholder="**********"
							value={confirmPassword}
							isPassword={true}
							setValue={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="flex-1">
						<Input
							ref={bioRef}
							label="Short Bio"
							placeholder="A Software Engineer majorly working on Web frontend intensive full stack stuff"
							value={bio}
							setValue={(e) => setBio(e.target.value)}
						/>
					</div>
				</div>
				<footer className="mt-10 justify-between flex">
					<div
						className="grid place-items-center cursor-pointer"
						onClick={() => setTab("login")}
					>
						<span className="text-sm">
							&larr;&nbsp;&nbsp;Login instead
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
							className="relative text-white group whitespace-nowrap overflow-hidden flex gap-2 w-[95px] hover:w-[115px] focus:w-[115px] transition-all duration-300 text-sm hover:ring-0 hover:outline-none hover:border-0 outline-none focus:ring-0 focus:border-0 focus:outline-none bg-orange-600 hover:bg-orange-600/90 focus:bg-orange-600/90 px-5 py-2 rounded-lg"
							onClick={register}
						>
							<span>Register</span>
							<span className="group-hover:text-white group-focus:text-white text-transparent translate-x-10 group-hover:translate-x-0 group-focus:translate-x-0 transition-all duration-300">
								&rarr;
							</span>
							{registering && (
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

export default Register;
