import React, { useEffect, useState } from "react";
import { INASAPost } from "./types";

const NASAPost = () => {
	const [loading, setLoading] = useState(true);
	const [post, setPost] = useState<INASAPost>();

	useEffect(() => {
		setLoading(true);
		fetch(
			"https://api.nasa.gov/planetary/apod?api_key=i8hX3Rs30nyfCgcjxebZaTgn82AhYoRODwJD20ct",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setPost(data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return loading ? (
		<span className="w-full h-full grid place-items-center">
			<div className="flex items-center gap-1">
				<span className="bg-orange-600 animate-ping h-5 w-5 rounded-xl " />
				<span className="bg-orange-600 animate-ping h-5 w-5 rounded-xl " />
				<span className="bg-orange-600 animate-ping h-5 w-5 rounded-xl " />
			</div>
		</span>
	) : (
		<section className="flex gap-5 flex-col border p-5 rounded-xl">
			<header className="border rounded-xl flex-none h-[250px] md:h-[500px]">
				{post?.media_type === "image" ? (
					<img
						src={post.url}
						alt={"Image for post"}
						className="h-full w-full rounded-xl object-contain"
					/>
				) : post?.media_type === "video" ? (
					<video
						src={post.url}
						controls={true}
						className="h-full w-full rounded-xl object-contain"
					/>
				) : null}
			</header>

			<h1 className="font-bold text-2xl leading-10 text-left">
				{post?.title}
			</h1>
			<p className="text-left">{post?.explanation}</p>
			<footer className="flex justify-between items-center">
				<p>{post?.date}</p>
				<p>&copy; {post?.copyright}</p>
			</footer>
		</section>
	);
};

export default NASAPost;
