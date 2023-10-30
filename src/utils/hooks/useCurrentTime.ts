import { useState, useEffect } from 'react';

const getCurrentTime = () => {
  const date = new Date();
  const day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const ampm = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 || 12;
  const formattedMinute = String(minute).padStart(2, '0');
  const formattedSecond = String(second).padStart(2, '0');

  return `${
    date.getMonth() + 1
  }월 ${date.getDate()}일 (${day}) ${ampm} ${formattedHour}시 ${formattedMinute} 분 ${formattedSecond}초`;
};

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentTime;
};
