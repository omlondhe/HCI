import { Dispatch, SetStateAction } from "react";

export interface IUser {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	bio: string;
}

export interface IRegisterProps {
	user: IUser | undefined;
	setTab: (tab: "login" | "register" | "dashboard") => void;
	setUser: Dispatch<SetStateAction<IUser | undefined>>;
}
