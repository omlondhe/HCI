import { motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";

const Animator: FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.section
			initial={{
				y: "100vh",
			}}
			animate={{
				y: 0,
				transition: {
					type: "spring",
					damping: 9,
					stiffness: 50,
				},
			}}
			exit={{
				y: "100vh",
				transition: {
					duration: 0.4,
				},
			}}
			key={"login"}
		>
			{children}
		</motion.section>
	);
};

export default Animator;
