import imageLogo from '../assets/images/logo.png'

const Navbar = () => {
  return (
    <div className="relative border-b-2 border-gray">
      <div className="container flex h-24 items-center">
        <div className="logo">
          <img src={imageLogo} alt="logo" />
        </div>
        <h1 className="absolute left-0 right-0 mx-auto hidden w-fit text-2xl font-bold tracking-wide text-gray-dark md:block">
          快速省時的電子簽署工具
        </h1>
      </div>
    </div>
  )
}

export default Navbar
