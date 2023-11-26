import './App.css';
import { ResultComponent } from './components/result/result.component';
import { DividerComponent } from './components/divider/divider.component';
import { SelectionComponent } from './components/selection/selection.component';
import { useEffect, useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    day: null,
    month: null,
    year: null
  });
  const [btnClick, setBtnClick] = useState(0);
  const [resultYears, setResultYears] = useState(null);
  const [resultMonths, setResultMonths] = useState(null);
  const [resultDays, setResultDays] = useState(null);
  const [errors, setErrors] = useState({
    day: null,
    month: null,
    year: null
  });

  useEffect(() => {
    if (btnClick !== 0 && errors.day == null && errors.month == null && errors.year == null) {
      const birthDate = new Date(formData.year, formData.month - 1, formData.day);
      const currentDate = new Date();

      let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
      const hasBirthdayOccurred = (
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
      );
      if (!hasBirthdayOccurred) {
        ageInYears -= 1;
      }

      // Calculate months
      const birthMonth = birthDate.getMonth();
      const currentMonth = currentDate.getMonth();
      let monthDifference = currentMonth - birthMonth + (hasBirthdayOccurred ? 0 : 12);

      // Calculate days
      const birthDay = birthDate.getDate();
      const currentDay = currentDate.getDate();
      let dayDifference = currentDay +  new Date(formData.year, formData.month, 0).getDate()
      - birthDay;

      if (dayDifference < 0) {
        monthDifference -= 1;
        dayDifference = currentDay - birthDay;
      }

      setResultYears(ageInYears);
      setResultMonths(monthDifference);
      setResultDays(dayDifference);
    } else {
      setResultDays(null);
      setResultMonths(null);
      setResultYears(null);
    }
  }, [btnClick]);

  const validateForm= () => {
    const currentDate = new Date();
    const err = {
      day: null,
      month: null,
      year: null,
    };
    if(formData.day == null) {
      err.day = 'This field is required';
    } else if(Number(formData.day) > 31 || Number(formData.day) < 1) {
      err.day = 'Must be a valid day';
    }

    if(formData.month == null) {
      err.month = 'This field is required';
    } else if(Number(formData.month) > 12 || Number(formData.month) < 1) {
      err.month = 'Must be a valid month';
    }

    if(formData.year == null) {
      err.year = 'This field is required';
    } else if(formData.year > currentDate.getFullYear()) {
        err.year = 'Must be in the past';
    }

    if(formData.month != null && formData.day != null && formData.year != null) {
      const daysInMonth = new Date(formData.year, formData.month, 0).getDate();
      if(Number(formData.day) > daysInMonth) {
        err.day = 'Must be a valid day';
      }
    }
    setErrors(err);
    console.log(errors);
  }
  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateAge = () => {
    validateForm();
    setBtnClick(btnClick + 1);
  }


  return (
    <div id='background' className='flex'>
      <div id='container'>
        <SelectionComponent onInputChange={handleInputChange} err={errors}></SelectionComponent>
        <DividerComponent calculateAge={calculateAge}></DividerComponent>
        <ResultComponent days={resultDays} months={resultMonths} years={resultYears}></ResultComponent>
      </div>
    </div>
  );
}

export default App;
