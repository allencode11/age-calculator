import image from '../../assets/btn-img.png';
import './divider.styles.css';

export const DividerComponent = ({calculateAge}) => {
  return (
    <div id='divider'>
      <div id='line'></div>
      <div id='btn' className='flex' onClick={calculateAge}>
        <img id='btn-img' src={image} alt='btn-img' />
      </div>
    </div>
  )
}
