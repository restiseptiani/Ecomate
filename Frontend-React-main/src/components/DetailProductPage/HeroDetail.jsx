const Hero = () => {
    return (
        <div className="flex items-center justify-center gap-2 mx-auto pt-40 pb-20 text-neutral-800">
            <a href="/">Beranda</a>
            <svg className="w-4 h-4 mx-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6" />
            </svg>
            <a href="/belanja">Belanja</a>
            <svg className="w-4 h-4 mx-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6" />
            </svg>
            <p className="font-bold">Detail</p>
        </div>
    );
};

export default Hero;
