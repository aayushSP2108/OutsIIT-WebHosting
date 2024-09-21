import React, { useState } from 'react';

const images = [
    { src: 'https://cdn.prod.website-files.com/5d7b77b063a9066d83e1209c/63b413d8d81a374a5459deed_62d9175f8ea638dfc25b18fd_Image%2520Super%2520Resolution%2520Hero.jpeg', alt: 'Image 1' },
    { src: 'https://cdn.prod.website-files.com/5d7b77b063a9066d83e1209c/63b413d8d81a374a5459deed_62d9175f8ea638dfc25b18fd_Image%2520Super%2520Resolution%2520Hero.jpeg', alt: 'Image 2' },
    { src: 'https://cdn.prod.website-files.com/5b26e3fda3234fe366aa392d/667ecfe783667cbda2950b5f_assets_website_signup_darwin.webp', alt: 'Image 3' },
    { src: 'https://cdn.prod.website-files.com/5b26e3fda3234fe366aa392d/667ecfe783667cbda2950b5f_assets_website_signup_darwin.webp', alt: 'Image 4' },
];

const ImageGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
       
            <div
                className='biggerdiv bg-white h-56 rounded-2xl flex justify-center items-end'
                style={{
                    backgroundImage: selectedImage ? `url(${selectedImage.src})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                
            >
                <div className=' bg-slate-200 bg-opacity-60 w-[90%] h-[30%] flex justify-evenly py-2 rounded-lg mb-4'>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className='smallerdiv w-1/5 h-full bg-black rounded-lg cursor-pointer flex justify-center items-center'
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image.src} alt={image.alt} className='w-full h-full object-cover rounded-lg' />
                        </div>
                    ))}
                </div>
            </div>

    );
};

export default ImageGallery;
