import { FC } from "react";
import { IDashboardProps } from "./types";
import Header from "./Header";
import NASAPost from "./NASAPost";
import Dog from "./Dog";

const Dashboard: FC<IDashboardProps> = ({ user, setUser }) => {
	return (
		<section className="relative h-screen w-screen">
			<Header user={user} setUser={setUser} />
			<section className="p-5 max-w-4xl mx-auto flex flex-col gap-5">
				<NASAPost />
				<Dog />
			</section>
		</section>
	);
};

export default Dashboard;
