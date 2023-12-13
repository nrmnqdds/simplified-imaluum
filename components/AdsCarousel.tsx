import Image from "next/image";
import Link from "next/link";

export default function AdsCarousel({ ads }) {
	return (
		<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
			<ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
				{ads.structuredData.map((ad, index) => (
					<Link
						key={index}
						href={ad.adsLink}
						className="flex-shrink-0 w-36 h-36 relative mx-1 hover:opacity-50 transition-opacity duration-300"
					>
						<Image
							src={ad.adsImg}
							alt=""
							blurDataURL={ad.adsImg}
							placeholder="blur"
							fill
							sizes="100%"
							className="rounded-lg object-cover"
						/>
					</Link>
				))}
				{ads.structuredData.map((ad, index) => (
					<Link
						key={index}
						href={ad.adsLink}
						className="flex-shrink-0 w-36 h-36 relative mx-1 hover:opacity-50 transition-opacity duration-300"
					>
						<Image
							src={ad.adsImg}
							alt=""
							blurDataURL={ad.adsImg}
							placeholder="blur"
							fill
							sizes="100%"
							className="rounded-lg object-cover"
						/>
					</Link>
				))}
			</ul>
			<ul
				className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
				aria-hidden="true"
			>
				{ads.structuredData.map((ad, index) => (
					<Link
						key={index}
						href={ad.adsLink}
						className="flex-shrink-0 w-36 h-36 relative mx-1 hover:opacity-50 transition-opacity duration-300"
					>
						<Image
							src={ad.adsImg}
							alt=""
							blurDataURL={ad.adsImg}
							placeholder="blur"
							fill
							sizes="100%"
							className="rounded-lg object-cover"
						/>
					</Link>
				))}
				{ads.structuredData.map((ad, index) => (
					<Link
						key={index}
						href={ad.adsLink}
						className="flex-shrink-0 w-36 h-36 relative mx-1 hover:opacity-50 transition-opacity duration-300"
					>
						<Image
							src={ad.adsImg}
							alt=""
							blurDataURL={ad.adsImg}
							placeholder="blur"
							fill
							sizes="100%"
							className="rounded-lg object-cover"
						/>
					</Link>
				))}
			</ul>
		</div>
	);
}
