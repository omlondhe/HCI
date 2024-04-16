import { IInputProps } from "./types";
import { cn } from "../../utils/classNames";
import { forwardRef, useId, useState } from "react";

const Input = forwardRef<HTMLInputElement, IInputProps>(
	(
		{ label, placeholder, prefix, isPassword = false, value, setValue },
		ref
	) => {
		const id = useId();
		const [focused, setFocused] = useState(false);

		return (
			<label
				htmlFor={id}
				className="flex relative focus:ring-1 flex-1 border dark:border-0 focus:ring-gray-500 bg-white dark:bg-[#303030] rounded-lg"
			>
				<span
					className={cn(
						"text-sm text-left w-full absolute left-0.5 z-0 transition-all duration-300",
						focused ? "-top-6 opacity-100" : "top-0"
					)}
				>
					{label}
				</span>

				{prefix && (
					<div className="grid place-items-center pl-3 bg-white dark:bg-[#303030] z-10 rounded-s-lg">
						<span>{prefix}</span>
					</div>
				)}
				<input
					id={id}
					ref={ref}
					type={isPassword ? "password" : "text"}
					className="w-full z-20 outline-none text-sm border-none focus:ring-0 bg-white dark:bg-[#303030] rounded-lg"
					placeholder={focused ? `e.g. ${placeholder}` : label}
					autoComplete="off"
					value={value}
					onChange={setValue}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
			</label>
		);
	}
);

export default Input;
