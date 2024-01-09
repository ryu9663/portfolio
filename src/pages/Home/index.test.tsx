import { MemoryRouter } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { render, screen } from '@testing-library/react';

test('기본 test', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const projectIcon = screen.getByText('프로젝트');
  expect(projectIcon).toBeInTheDocument();
});
