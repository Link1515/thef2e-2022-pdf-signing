import imageLogo from '../assets/images/Logo.png'

const Navbar = () => {
  return (
    <div className='px-2 container'>
      <div className="logo">
        <img src={imageLogo} alt="logo" />
      </div>
      <h1>快速省時的電子簽署工具</h1>
    </div>
  )
}

export default Navbar