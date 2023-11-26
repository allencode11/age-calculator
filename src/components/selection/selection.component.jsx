import './selection.styles.css';
import { useEffect, useState } from 'react';

export const SelectionComponent = ({onInputChange, err}) => {
  const [visibleErr, setVisibleErr] = useState(null);
  useEffect(() => {
    console.log(err);
    if(err.day != null || err.month != null || err.year != null) {
      setVisibleErr(err.day || err.month || err.year);
    } else {
      setVisibleErr(null);
    }

    console.log(visibleErr);
  }, [err]);

  const handleDayChange = (event) => {
    const value = event.target.value;
    onInputChange('day', value);
  }

  const handleMonthChange = (event) => {
    const value = event.target.value;
    onInputChange('month', value);
  }

  const handleYearChange = (event) => {
    const value = event.target.value;
    onInputChange('year', value);
  }

  return (
    <div id='selection'>
      <div className='column'>
        <label className={visibleErr === null || visibleErr === false   ? null : 'label-error'} >DAY</label>
        <input className={visibleErr === null || visibleErr === false   ? null : 'input-error'} onChange={handleDayChange} placeholder='DD'></input>
        <div className={err.day == null ? 'hidden' : 'text-error'}>{err.day}</div>
      </div>
      <div className='column'>
        <label className={visibleErr === null || visibleErr === false  ? null : 'label-error'} >MONTH</label>
        <input className={visibleErr === null || visibleErr === false   ? null : 'input-error'} onChange={handleMonthChange} placeholder='MM'></input>
        <div className={err.month == null ? 'hidden' : 'text-error'}>{err.month}</div>
      </div>
      <div className='column'>
        <label className={visibleErr === null || visibleErr === false  ? null : 'label-error'} >YEAR</label>
        <input className={visibleErr === null || visibleErr === false  ? null : 'input-error'}  onChange={handleYearChange} placeholder='YYYY'></input>
        <div className={err.year == null ? 'hidden' : 'text-error'}>{err.year}</div>
      </div>
    </div>
  )
}
