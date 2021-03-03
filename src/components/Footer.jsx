import logoImg from '../assets/images/logo.svg';

const Footer = () => {
  const styles = {
    width: '100%',
    position:'absolute',
    left:'0',
    bottom:'10px',
    right:'0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return (
    <div style={styles}>
      <a href='https://rs.school/js/'>
        <img src={logoImg} style={{width: '50px'}} alt="logo RS School" />
      </a>
      <a href='https://github.com/Nickolay-Dudaryk'>
        GitHub
      </a>
      <span>2021</span>
    </div>
  )
}

export default Footer
