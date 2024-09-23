import React from 'react'
import colors from '../styles/colors'

export default function Footer() {
  return (
    <div>
        <footer style={{ backgroundColor: colors.componentColor }} className=" text-gray-400 py-4 mt-10 text-center">
        <p className='text-xl md:text-3xl font-bold'>&copy; 2024 IIT Gandhinagar. All rights reserved.</p>
        <p className='text-xl md:text-2xl font-bold'>Follow us on social media!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://x.com/iitgn?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="text-white hover:text-blue-400 text-xl md:text-3xl font-bold">Twitter</a>
          <a href="https://www.instagram.com/iit_gandhinagar/?hl=en" className="text-white hover:text-blue-400 text-xl md:text-3xl font-bold">Instagram</a>
          <a href="https://www.facebook.com/iitgn.official/" className="text-white hover:text-blue-400 text-xl md:text-3xl font-bold">Facebook</a>
        </div>
      </footer>
    </div>
  )
}
