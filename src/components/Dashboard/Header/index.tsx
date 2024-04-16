import { FC } from "react";
import { IHeaderProps } from "./types";

const Header: FC<IHeaderProps> = ({ user, setUser }) => {
	const logout = () => {
		setUser(undefined);
		localStorage.removeItem("user");
	};

	return (
		<header className="bg-[#222222] flex items-center justify-between p-10 w-full h-10">
			<div>
				<h1 className="text-lg font-bold">HCI</h1>
			</div>
			<div className="flex items-center gap-5">
				<p>Hi, {user?.firstName}</p>
				<button
					className="text-sm hover:ring-0 hover:outline-none outline-none focus:ring-0 focus:outline-none bg-transparent border border-gray-400 hover:bg-red-600/50 focus:bg-red-600/50 hover:border focus:border hover:border-red-600 focus:border-red-600 px-5 py-2 rounded-lg"
					onClick={logout}
				>
					Log out
				</button>
			</div>
		</header>
	);
};

export default Header;
