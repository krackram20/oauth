import headerStyles from './header.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <div 
        style={{display: "flex", justifyContent: "center"}}
        className= {headerStyles.container}>
            

            <Link href= '/'>
        <a >
        <Image  src="/logo.svg" height={50} width={50} alt = ''/>
        </a>
    </Link>
        </div>
    )
}