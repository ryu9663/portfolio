import { IconFolderType } from '@/components/Icon';
import { Home } from '@/pages/Home';
import { ICONS } from '@/utils/constant';
import { renderAppWithRouterMatch } from '@/utils/test/renderWidthRouterMatch';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('최소화후에 언더바에 아이콘을 클릭하면 이전상태로 되돌아온다.', async () => {
  const user = userEvent.setup();

  render(renderAppWithRouterMatch(<Home />, '/', '/'));

  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
  await user.dblClick(folderIcon);
  // 윈도우 창이 열린다.
  const windowBox = screen.getByTestId('windowbox-testid');
  expect(windowBox).toBeInTheDocument();

  describe('윈도우창이 열리면 아이콘 이미지는 3개다. (윈도우창, 언더바, 바탕화면)', () => {
    const folderIcons = screen.getAllByAltText((ICONS[3] as IconFolderType).alt);
    expect(folderIcons.length).toBe(3);
    describe('처음에 윈도우는 normal 이다.', () => {
      expect(windowBox).toHaveClass('_normal_0145d3');
      const maximizeButton = screen.getByText('+');
      const minimizeButton = screen.getByText('-');

      describe('normal인 상태에서 바로 윈도우창을 최소화했다가 언더바에 해당 아이콘을 클릭하면 normal 상태로 원상복귀 된다.', async () => {
        await user.click(minimizeButton);
        expect(windowBox).toHaveClass('_minimized_0145d3');
        const { bottom: bottomMinimizedWindow } = window.getComputedStyle(windowBox);
        expect(bottomMinimizedWindow).toBe('-150px');

        describe('언더바에 해당 아이콘을 클릭하면 윈도우창이 원상복귀된다.', async () => {
          const projectIcons = screen.getAllByAltText((ICONS[3] as IconFolderType).alt);
          const underbarIcon = projectIcons.find(element =>
            element.classList.contains('_window_infoes-button_img_351a9b'),
          );
          if (!underbarIcon) throw new Error('underbarIcon is null');
          await user.click(underbarIcon);
          expect(windowBox).toHaveClass('_normal_0145d3');

          describe('최대화 버튼을 눌렀을때 최대화 되는 것을 확인하고, 최소화 한다.', async () => {
            await user.click(maximizeButton);
            expect(windowBox).toHaveClass('_maximized_0145d3');
            const { bottom: bottomMaximizedWindow, left: leftMaximizedWindow } = window.getComputedStyle(windowBox);
            expect(bottomMaximizedWindow).toBe('50px');
            expect(leftMaximizedWindow).toBe('0px');

            await user.click(minimizeButton);
            expect(windowBox).toHaveClass('_minimized_0145d3');
            const { bottom: bottomMinimizedWindow } = window.getComputedStyle(windowBox);
            expect(bottomMinimizedWindow).toBe('-150px');

            it('언더바에 해당 아이콘을 클릭하면 윈도우창이 최대화 된다.', async () => {
              const projectIcons = screen.getAllByAltText((ICONS[3] as IconFolderType).alt);
              const underbarIcon = projectIcons.find(element =>
                element.classList.contains('_window_infoes-button_img_351a9b'),
              );
              if (!underbarIcon) throw new Error('underbarIcon is null');
              await user.click(underbarIcon);
              expect(windowBox).toHaveClass('_maximized_0145d3');
              expect(bottomMaximizedWindow).toBe('50px');
              expect(leftMaximizedWindow).toBe('0px');
            });
          });
        });
      });
    });
  });
});
