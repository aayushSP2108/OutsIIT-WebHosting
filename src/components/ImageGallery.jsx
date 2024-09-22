import React, { useState, useEffect } from 'react';
import menuData from '../data/Menu.json';

const ImageGallery = ({ outletName }) => {
    const [outlets, setOutlets] = useState([]);

    useEffect(() => {
        const outlet = menuData.outlets.find(o => o.name === outletName);
        setOutlets(outlet ? [outlet] : []);
    }, [outletName]);

    const uniqueItems = new Map();

    outlets.forEach(outlet => {
        outlet.menu.forEach(menu => {
            menu.items.forEach(item => {
                if (!uniqueItems.has(item.item)) {
                    uniqueItems.set(item.item, {
                        name: item.item,
                        image: item.image,
                        outletName: outlet.name,
                    });
                }
            });
        });
    });

    const itemsArray = Array.from(uniqueItems.values());
    const images = itemsArray.map(item => ({
        src: item.image,
        name: item.name,
    }));

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const selectedImage = images[selectedImageIndex] || { src: 'default_image_url', name: '' };

    return (
        <div
            className='biggerdiv bg-white h-56 rounded-2xl flex justify-center items-end'
            style={{
                backgroundImage: selectedImage ? `url(${selectedImage.src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}

        >
            {/* <div className=' bg-slate-200 bg-opacity-60 w-[90%] h-[30%] flex justify-evenly py-2 rounded-lg mb-4'>
                {outlets.map((outlet, index) => (
                    <div
                        key={index}
                        className='smallerdiv w-1/5 h-full bg-black rounded-lg cursor-pointer flex justify-center items-center'
                        onClick={() => setSelectedImageIndex(outlet)}
                    >
                        <img src={outlet.src} alt={outlet.alt} className='w-full h-full object-cover rounded-lg' />
                    </div>
                ))}
            </div> */}
        </div>
    )
};

export default ImageGallery;
