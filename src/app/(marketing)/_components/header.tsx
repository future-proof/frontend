"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LoginButton from "@/components/onchainKit/LoginButton";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const MainHeader: React.FC = () => {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed px-8  top-0 left-0 right-0 z-50 transition-all  border-b-[#dcdcdc3d] duration-300 flex items-center justify-between h-[10vh] ${
				isScrolled
					? "bg-black bg-opacity-80 backdrop-blur-md"
					: "bg-transparent"
			}`}>
			<div className='flex items-center gap-2'>
				<Image
					src='/logo.svg'
					width={38}
					height={38}
					alt=''
				/>
				<p>FutureProof</p>
			</div>
			<div className='flex justify-center items-center gap-6'>
				<a
					className='text-sm'
					href='#'>
					Home
				</a>
				<a
					className='text-sm'
					href='#'>
					Features
				</a>
				<a
					className='text-sm'
					href='#'>
					Team
				</a>
			</div>
			<button className='flex justify-center items-center border rounded-[1.6rem] text-[.8rem] gap-3 pl-5 border-[#e9e9e96f]'>
				Get started
				<ChevronRight
					color='#c4c4c4f7'
					className='border rounded-full h-9 w-9 p-1 bg-[#c4c4c41d]'
				/>
			</button>
		</nav>
	);
};

export default MainHeader;
