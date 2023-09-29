import { Button, Header as StorybookHeader } from 'junyeol-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';
export const Header = memo(
  () => (
    <StorybookHeader>
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
    </StorybookHeader>
  ),
  () => true,
);
