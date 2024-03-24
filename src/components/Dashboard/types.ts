import { IUser } from "../Register/types";
import { Dispatch, SetStateAction } from "react";

export interface IDashboardProps {
	user: IUser | undefined;
	setUser: Dispatch<SetStateAction<IUser | undefined>>;
}
