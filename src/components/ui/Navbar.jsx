import { nav_items } from '@/constants/navigation'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='py-[18px] px-[32px] w-full flex justify-between items-center'>
      <div className='flex gap-2'>
        <h5 className='font-bold text-[20px] text-primary'>Geefi Residence</h5>
      </div>

      <ul className='flex gap-8'>
        {nav_items.map((item) => (
          <li key={item.id}>
            <Link 
              href={item.href} 
              className='transition-colors duration-200 text-[14px] text-secondary hover:text-primary font-regular'
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link 
      href={"#"}
      className='py-2.5 px-6 font-whte text-semibold font-[14px] rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200'>
        Hubungi Kami
      </Link>
    </div>
  )
}

export default Navbar