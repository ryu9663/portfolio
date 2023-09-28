import { Button } from 'junyeol-components';

const Home = () => {
  const handleClickButton = () => console.log('click');
  return (
    <div>
      <Button onClick={handleClickButton}>button</Button>
      Home
      <button>hi</button>
    </div>
  );
};

export default Home;
