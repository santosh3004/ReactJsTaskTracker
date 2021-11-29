import PropTypes from 'prop-types'
import Button from './Button'
const Header=({title,onAddBtn,showADD})=>{
  return(
    <header className='header'>
      <h1>{title}</h1>
      <Button onClick={onAddBtn} color='green' text={showADD?'Close':'Add'}/>
    </header>
  )
}

Header.defaultProps={
  title:'Task Tracker',
}

Header.propTypes={
  title: PropTypes.string.isRequired,
}
export default Header