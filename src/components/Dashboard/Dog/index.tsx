import React, { useEffect, useState } from "react";

const Dog = () => {
	const [loading, setLoading] = useState(true);
	const [image, setImage] = useState<string>();
	const [randomNumber, refetch] = useState(0);

	useEffect(() => {
		setLoading(true);
		fetch("https://dog.ceo/api/breeds/image/random", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setImage(data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [randomNumber]);

	return (
		<section className="flex gap-5 flex-col border p-5 rounded-xl">
			<div className="h-96">
				{loading ? (
					<span className="w-full h-full grid place-items-center">
						<div className="flex items-center gap-1">
							<span className="bg-orange-600 animate-ping h-5 w-5 rounded-xl " />
							<span className="bg-orange-600 animate-ping h-5 w-5 rounded-xl " />
							<span className="bg-orange-600 animate-ping h-5 w-5 rounded-xl " />
						</div>
					</span>
				) : (
					<img
						src={image}
						alt={"Image of a dog"}
						className="h-96 w-full rounded-xl object-contain"
					/>
				)}
			</div>
			<button
				className="text-sm hover:ring-0 hover:outline-none outline-none focus:ring-0 focus:outline-none bg-transparent border border-gray-400 hover:bg-orange-600/50 focus:bg-orange-600/50 hover:border focus:border hover:border-orange-600 focus:border-orange-600 px-5 py-2 rounded-lg"
				onClick={() => refetch(Math.random())}
			>
				Refetch a dog
			</button>
		</section>
	);
};

export default Dog;
