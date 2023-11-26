import './result.styles.css';

export const ResultComponent = ({days, months , years}) => {
  return (
    <div id='result'>
      <div className='row'>
        <div className='number'>{years != null ? years : '- -'}</div>
        <div className='text'>years</div>
      </div>
      <div className='row'>
        <div className='number'>{months != null  ? months : '- -'}</div>
        <div className='text'>months</div>
      </div>
      <div className='row'>
        <div className='number'>{days != null  ? days : '- -'}</div>
        <div className='text'>days</div>
      </div>
    </div>
  )
}
