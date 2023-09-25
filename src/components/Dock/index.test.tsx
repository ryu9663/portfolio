import { render, fireEvent, screen } from "@testing-library/react";
import { Dock } from "./index";

test("Dock에는 시작 버튼이 있다.", () => {
  render(<Dock />);
  const startButton = screen.getByRole("button", { name: "시작" });
  expect(startButton).toBeInTheDocument();
});

test("시작 버튼을 누르면 작업표시줄이 열린다.", () => {
  render(<Dock />);
  // 시작 버튼이 있다.
  const startButton = screen.getByRole("button", { name: "시작" });
  expect(startButton).toBeInTheDocument();

  // 처음에는 작업표시줄이 없다.
  expect(screen.queryByText("Windows 95")).not.toBeInTheDocument();

  // 버튼 클릭
  fireEvent.click(startButton);

  // 작업표시줄이 보인다.
  expect(screen.getByText("Windows95"));
});

test("작업표시줄 외부를 클릭하면 작업표시줄이 꺼진다.", () => {
  render(<Dock />);
  // 시작 버튼이 있다.
  const startButton = screen.getByRole("button", { name: "시작" });
  expect(startButton).toBeInTheDocument();

  // 작업표시줄을 열어본다.
  fireEvent.click(startButton);
  expect(screen.getByText("Windows95")).toBeInTheDocument();

  //! 작업표시줄 외부를 클릭한다. 어떻게하지
});

test("작업표시줄 내부를 클릭하면 작업표시줄이 꺼지지 않는다.", () => {});
