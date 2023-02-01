import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

export default function Home() {
	const [address, setAddress] = useState("");
	const [tokenList, setTokenList] = useState([]);

	const apikey = process.env.NEXT_PUBLIC_API_KEY;

	const url =
		"https://api.helius.xyz/v0/addresses/" +
		address +
		"/balances?api-key=" +
		apikey +
		"";

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await axios.get(url);
		console.log(data);
		console.log("tokens: ", data.tokens);
		setTokenList(data.tokens);
	};

	return (
		<>
			<Head>
				<title>ChatBAL</title>
			</Head>

			<main className={styles.main}>
				<div className=" relative min-h-screen bg-gray-100 p-8">
					<div className="max-w-4xl mx-auto space-y-12 grid grid-cols-1">
						<div className="place-self-start">
							<div className="bg-emerald-400 text-black p-5 rounded-2xl rounded-tl-none">
								Hey, send me the wallet address I will show what & how much it
								holds!
							</div>
						</div>
						<div>
							{tokenList.map((tokens) => {
								return (
									<div key={tokens.id} className="place-self-start text-left">
										<div className="bg-green-50 text-black p-5 rounded-2xl rounded-tl-none">
											Token address = "{tokens.mint}" Qunatity= "
											{Math.floor(tokens.amount) / 1000000}";
										</div>
									</div>
								);
							})}
						</div>

						<form className="mt-4 flex absolute bottom-0 pb-2">
							<div>
								<input
									type="text"
									onChange={(e) => setAddress(e.target.value)}
									id="address"
									className="bg-gray-50 border w-96 border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Enter wallet address here"
									required
								/>
							</div>
							<div className="pl-2">
								<button
									type="submit"
									onClick={handleSubmit}
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
