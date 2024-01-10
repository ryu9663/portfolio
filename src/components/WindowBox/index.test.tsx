import { IconFolderType, OpenableIconType } from '@/components/Icon';
import { ICONS } from '@/utils/constant';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';

const CLASS_NORMAL = '_normal_0145d3';
const CLASS_MINIMIZE = '_minimized_0145d3';
const CLASS_MAXIMIZE = '_maximized_0145d3';

it('링크가 아닌 아이콘을 더블클릭해서 창을 열었을때의 상태는 normal이다.', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
  await user.dblClick(folderIcon);
  const windowBox = screen.getByTestId(`windowbox-testid-${(ICONS[3] as IconFolderType).alt}`);
  expect(windowBox).toHaveClass(CLASS_NORMAL);
});

it('헤더에 버튼을 눌러서 창을 최소화,최대화 할 수 있다.', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  describe('폴더 아이콘을 더블클릭해서 창을 열었다.', async () => {
    // 폴더 아이콘을 더블클릭해서 창을 열었다.
    const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
    await user.dblClick(folderIcon);
    const windowBox = screen.getByTestId('windowbox-testid');
    expect(windowBox).toHaveClass(CLASS_NORMAL);

    it('최대화 버튼을 누르면 최대화가 된다.', async () => {
      const maximizeButton = screen.getByText('+');
      await user.click(maximizeButton);
      expect(windowBox).toHaveClass(CLASS_MAXIMIZE);
      const { bottom: bottomMaximizedWindow } = window.getComputedStyle(windowBox);
      expect(bottomMaximizedWindow).toBe('50px');
    });

    it('최소화 버튼을 누르면 최소화가 된다.', async () => {
      const minimizeButton = screen.getByText('-');
      await user.click(minimizeButton);
      expect(windowBox).toHaveClass(CLASS_MINIMIZE);
      const { bottom: bottomMinimizedWindow } = window.getComputedStyle(windowBox);
      expect(bottomMinimizedWindow).toBe('-150px');
    });
  });
});

test('윈도우 창을 두개 킨다.', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  // 폴더 아이콘을 더블클릭해서 창을 열었다.
  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
  await user.dblClick(folderIcon);
  const windowBox = screen.getByTestId(`windowbox-testid-${(ICONS[3] as IconFolderType).alt}`);
  expect(windowBox).toHaveClass(CLASS_NORMAL);
});

test('열린 윈도우창에서 또 아이콘을 더블클릭하면 창이 켜진다.', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  // 폴더 아이콘을 더블클릭해서 창을 열었다.
  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
  await user.dblClick(folderIcon);
  const firstOpenedWindowBox = screen.getByTestId(`windowbox-testid-${(ICONS[3] as IconFolderType).alt}`);
  expect(firstOpenedWindowBox).toHaveClass(CLASS_NORMAL);

  // 폴더 아이콘의 children이 화면에 있고, 더블클릭하면 창이 열린다.
  const childrenIconAlt = ((ICONS[3] as IconFolderType).children as OpenableIconType[])[2].alt;
  const childrenIcon = screen.getByAltText(childrenIconAlt);
  await user.dblClick(childrenIcon);
  const lastOpenedWindowBox = screen.getByTestId(`windowbox-testid-${childrenIconAlt}`);
  expect(lastOpenedWindowBox).toBeInTheDocument();

  // zIndex를 비교했을 때, 나중에 열린 윈도우창이 제일 위에 있다.
  const { zIndex: zIndexLastOpened } = window.getComputedStyle(lastOpenedWindowBox);
  const { zIndex: zIndexFirstOpened } = window.getComputedStyle(firstOpenedWindowBox);
  expect(zIndexFirstOpened < zIndexLastOpened).toBe(true);

  // 먼저 열린 창을 클릭하면, 먼저 열린 창이 제일 위로 온다.

  await user.click(firstOpenedWindowBox);

  // screen.debug();
  const { zIndex: zIndexLastOpenedAfter } = window.getComputedStyle(lastOpenedWindowBox);
  const { zIndex: zIndexFirstOpenedAfter } = window.getComputedStyle(firstOpenedWindowBox);

  expect(zIndexFirstOpenedAfter > zIndexLastOpenedAfter).toBe(true);
});

//! TODO : 창하나 최대화 하고, 다른 창 켜고, 다른 창을 최소화 했을때 먼저 킨 창이 유지되나.
