import React from 'react';
import Image from '../../assets/jpg/user.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

    const ProductCarousel = () => {
        const originalItems = [
            { id: 1, name: "Rizki Andini", date: "06 September 2024", message: '"Saya sangat terkesan dengan produk dari Ecomate! Tidak hanya berkualitas, tapi juga membantu saya menjalani gaya hidup yang lebih berkelanjutan. Sangat direkomendasikan!"' },
            { id: 2, name: "Farhan Alfiansyah", date: "06 September 2024", message: '"Saya sangat terkesan dengan produk dari Ecomate! Tidak hanya berkualitas, tapi juga membantu saya menjalani gaya hidup yang lebih berkelanjutan. Sangat direkomendasikan!"' },
            { id: 3, name: "Rizki Andini", date: "06 September 2024", message: '"Saya sangat terkesan dengan produk dari Ecomate! Tidak hanya berkualitas, tapi juga membantu saya menjalani gaya hidup yang lebih berkelanjutan. Sangat direkomendasikan!"' },
            { id: 4, name: "Farhan Alfiansyah", date: "06 September 2024", message: '"Saya sangat terkesan dengan produk dari Ecomate! Tidak hanya berkualitas, tapi juga membantu saya menjalani gaya hidup yang lebih berkelanjutan. Sangat direkomendasikan!"' },
            { id: 5, name: "Rizki Andini", date: "06 September 2024", message: '"Saya sangat terkesan dengan produk dari Ecomate! Tidak hanya berkualitas, tapi juga membantu saya menjalani gaya hidup yang lebih berkelanjutan. Sangat direkomendasikan!"' },
            { id: 6, name: "Farhan Alfiansyah", date: "06 September 2024", message: '"Saya sangat terkesan dengan produk dari Ecomate! Tidak hanya berkualitas, tapi juga membantu saya menjalani gaya hidup yang lebih berkelanjutan. Sangat direkomendasikan!"' },
        ];
    return (
        <div className=' bg-primary h-fit pb-10'>
            <div className="pt-14">
                <p className="text-[18px] text-sm text-white text-center justify-center font-semibold">Testimoni</p>
                <h1 className="text-white text-3xl md:text-[48px] max-w-full md:max-w-[764px] mx-auto text-center font-bold leading-tight">Pengalaman Nyata dengan Produk Ramah Lingkungan Kami</h1>
            </div>
            {/* Slider */}
            <div className="relative h-fit bg-primary w-full">
                <div className="md:w-[70%] w-full mx-auto bg-primary rounded-xl">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        speed={5000} // Kecepatan pergerakan slide
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                        autoplay={{
                            delay: 0, // Tidak ada jeda antar slide
                            disableOnInteraction: false,
                            reverseDirection: false // Arah pergerakan
                        }}
                        allowTouchMove={false} // Nonaktifkan interaksi sentuh
    
                    className="h-[700px]"
                    >
                    {originalItems.map((item) => (
                        <SwiperSlide key={item.id} className="">
                        <div className="text-neutral ">
                            <div className='w-full  ' >
                            <img    
                                src={Image}
                                className='w-[100px] h-[100px] rounded-full object-cover object-top relative top-14 item-center mx-auto justify-center'  
                                alt={item.name} 
                                />
                            </div>
                            <div className="flex flex-col justify-center bg-white shadow-lg rounded-xl items-center mx-auto w-[350px] h-[450px]">
                            <div className="p-5  flex flex-col justify-between">
                                <div className='text-center   my-28 h-[100px] flex md:items-center justify-center'>
                                <h1>{item.message}</h1>
                                </div>
                                <div className='text-center'>
                                <h1 className='font-bold text-2xl'>{item.name}</h1>
                                <h1 className='text-sm text-[#999999]'>{item.date}</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
                </div>

            {/* End Slider */}
            </div>

    );
};

export default ProductCarousel;