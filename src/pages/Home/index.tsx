import { Button, Header } from 'junyeol-components';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  const handleClickButton = () => console.log('click');
  return (
    <>
      <main>
        <Header>
          {[
            { link: '/', name: '자기소개' },
            { link: '/carrer', name: '이력' },
            { link: '/whatidid', name: '했던 일' },
          ].map((button, i) => (
            <li key={i}>
              <Link to={button.link}>
                <Button>{button.name}</Button>
              </Link>
            </li>
          ))}
        </Header>
        <a href="/">home</a>
        <Button onClick={handleClickButton}>button</Button>
        Home
        <button>hi</button>
        <div id="detail">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Home;
