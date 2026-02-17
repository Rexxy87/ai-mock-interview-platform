import Image from 'next/image'
import Link from 'next/link'
import {ReactNode} from 'react'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className='flex items-center gap-2'>
        <Image src="/logo.svg" alt="Logo" width={38} height={32} className='mb-10'/>
        <h2 className='text-primary-100 mb-10'>MockAI</h2>
        </Link>
        {children}
      </nav>
    </div>
  )
}

export default Rootlayout 