import { ChangeEvent } from "react";

export interface IInputProps {
	label: string;
	placeholder: string;
	isPassword?: boolean;
	prefix?: string;
	value?: string;
	setValue?: (value: ChangeEvent<HTMLInputElement>) => void;
}
