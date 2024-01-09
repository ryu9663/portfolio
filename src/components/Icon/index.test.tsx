import { Icon, IconFolderType, IconLinkType } from '@/components/Icon';
import { ICONS } from '@/utils/constant';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';

test('링크가 아닌 아이콘을 더블클릭하면 창이 열린다.', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);

  await user.dblClick(folderIcon);

  // 윈도우창이 열린다.
  const windowBox = screen.getByTestId('windowbox-testid');
  expect(windowBox).toBeInTheDocument();
});

test('링크를 더블클릭하면 해당 링크로 새 브라우저 창이 열린다.', async () => {
  window.open = vi.fn();
  const user = userEvent.setup();
  const linkIcon = ICONS[0] as IconLinkType;

  const setIconsMock = vi.fn();
  const handleDragStartMock = vi.fn();
  render(
    <MemoryRouter>
      <Icon key={linkIcon.id} icon={linkIcon} setIcons={setIconsMock} handleDragStart={handleDragStartMock} />
    </MemoryRouter>,
  );
  const icon = screen.getByAltText(linkIcon.alt).parentElement!;
  await user.dblClick(icon);
  expect(window.open).toHaveBeenCalledWith(linkIcon.link);
});
