import Link from 'next/link'
import CssLogo from 'components/CssLogo'

const Header = () => {
  return (
    <header className="container flex items-center justify-between p-4 mx-auto">
      <Link href="/" passHref={true}>
        <CssLogo />
      </Link>
    </header>
  )
}

export default Header