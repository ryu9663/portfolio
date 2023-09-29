import { Button } from 'junyeol-components';
import { useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);
  const handleClickButton = () => setCount(count => count + 1);
  return (
    <>
      <a href="/">home</a>
      <Button onClick={handleClickButton}>count++</Button>
      {count}
      <button>hi</button>
    </>
  );
};

export default Home;
