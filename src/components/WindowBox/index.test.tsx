import { IconFolderType } from '@/components/Icon';
import { ICONS } from '@/utils/constant';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';

const CLASS_NORMAL = '_normal_0145d3';
const CLASS_MINIMIZE = '_minimized_0145d3';
const CLASS_MAXIMIZE = '_maximized_0145d3';

test('링크가 아닌 아이콘을 더블클릭해서 창을 열었을때의 상태는 normal이다.', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
  await user.dblClick(folderIcon);
  const windowBox = screen.getByTestId('windowbox-testid');
  expect(windowBox).toHaveClass(CLASS_NORMAL);
});

test('헤더에 버튼을 눌러서 창을 최소화,최대화 할 수 있다.', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  // 폴더 아이콘을 더블클릭해서 창을 열었다.
  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
  await user.dblClick(folderIcon);
  const windowBox = screen.getByTestId('windowbox-testid');
  expect(windowBox).toHaveClass(CLASS_NORMAL);

  // 최대화 버튼을 누른다.
  const maximizeButton = screen.getByText('+');
  await user.click(maximizeButton);
  expect(windowBox).toHaveClass(CLASS_MAXIMIZE);
  const { bottom: bottomMaximizedWindow } = window.getComputedStyle(windowBox);
  expect(bottomMaximizedWindow).toBe('50px');

  // 최소화 버튼을 누른다.
  const minimizeButton = screen.getByText('-');
  await user.click(minimizeButton);
  expect(windowBox).toHaveClass(CLASS_MINIMIZE);
  const { bottom: bottomMinimizedWindow } = window.getComputedStyle(windowBox);
  expect(bottomMinimizedWindow).toBe('-150px');
});
