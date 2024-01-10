import { Icon, IconFolderType, IconLinkType } from '@/components/Icon';
import { ICONS } from '@/utils/constant';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { renderAppWithRouterMatch } from '@/utils/test/renderWidthRouterMatch';

describe('아이콘과 관련된 테스트', () => {
  it('링크가 아닌 아이콘을 더블클릭하면 창이 열린다.', async () => {
    const user = userEvent.setup();

    render(renderAppWithRouterMatch(<Home />, '/', '/'));

    const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
    await user.dblClick(folderIcon);

    // 윈도우창이 열린다.
    const windowBox = screen.getByTestId(`windowbox-testid-${(ICONS[3] as IconFolderType).alt}`);
    expect(windowBox).toBeInTheDocument();

    // 윈도우창이 열리면 아이콘 이미지는 3개다. (윈도우창, 언더바, 바탕화면)
    const folderIcons = screen.getAllByAltText((ICONS[3] as IconFolderType).alt);
    expect(folderIcons.length).toBe(3);
  });

  it('링크를 더블클릭하면 해당 링크로 새 브라우저 창이 열린다.', async () => {
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

  it('아이콘의 이름을 바꾸면 윈도우창, 언더바의 이름도 바뀐다. (엔터)', async () => {
    const user = userEvent.setup();
    render(renderAppWithRouterMatch(<Home />, '/', '/'));

    // 처음에 아이콘 타이틀은 readonly상태이다.
    const folderIconTitle = screen.getByDisplayValue((ICONS[3] as IconFolderType).alt);
    expect(folderIconTitle).toHaveAttribute('readonly');

    // 아이콘을 더블클릭해서 윈도우창을 킨다.
    const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
    await user.dblClick(folderIcon);
    const windowBox = screen.getByTestId(`windowbox-testid-${(ICONS[3] as IconFolderType).alt}`);
    expect(windowBox).toBeInTheDocument();

    // 아이콘 타이틀을 더블클릭하면 readonly가 풀린다.
    await user.dblClick(folderIconTitle);
    expect(folderIconTitle).toHaveClass('_icon_title_edit_4cc593');
    expect(folderIconTitle).not.toHaveAttribute('readonly');

    // 아이콘 타이틀을 바꾸고 엔터를 누르면 readonly가 다시 적용된다.
    fireEvent.change(folderIconTitle, { target: { value: 'hello' } });
    fireEvent.keyDown(folderIconTitle, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(folderIconTitle).toHaveAttribute('readonly');
    expect(folderIconTitle).not.toHaveClass('_icon_title_edit_4cc593');

    // 바탕화면, 언더바, 윈도우창에서 모두 이름이 바뀐다.
    expect(folderIconTitle).toHaveValue('hello');
    const folderIcons = screen.getAllByAltText('hello');
    expect(folderIcons.length).toBe(3);
  });

  it('아이콘의 이름을 바꾸면 윈도우창, 언더바의 이름도 바뀐다. (blur)', async () => {
    const user = userEvent.setup();
    render(renderAppWithRouterMatch(<Home />, '/', '/'));

    // 처음에 아이콘 타이틀은 readonly상태이다.
    const folderIconTitle = screen.getByDisplayValue((ICONS[3] as IconFolderType).alt);
    expect(folderIconTitle).toHaveAttribute('readonly');

    // 아이콘을 더블클릭해서 윈도우창을 킨다.
    const folderIcon = screen.getByAltText((ICONS[3] as IconFolderType).alt);
    await user.dblClick(folderIcon);
    const windowBox = screen.getByTestId(`windowbox-testid-${(ICONS[3] as IconFolderType).alt}`);
    expect(windowBox).toBeInTheDocument();

    // 아이콘 타이틀을 더블클릭하면 readonly가 풀린다.
    await user.dblClick(folderIconTitle);
    expect(folderIconTitle).toHaveClass('_icon_title_edit_4cc593');
    expect(folderIconTitle).not.toHaveAttribute('readonly');

    // 아이콘 타이틀을 바꾸고 엔터를 누르면 readonly가 다시 적용된다.
    fireEvent.change(folderIconTitle, { target: { value: 'hello' } });
    fireEvent.blur(folderIconTitle);

    expect(folderIconTitle).toHaveAttribute('readonly');
    expect(folderIconTitle).not.toHaveClass('_icon_title_edit_4cc593');

    // 바탕화면, 언더바, 윈도우창에서 모두 이름이 바뀐다.
    expect(folderIconTitle).toHaveValue('hello');
    const folderIcons = screen.getAllByAltText('hello');
    expect(folderIcons.length).toBe(3);
  });
});
