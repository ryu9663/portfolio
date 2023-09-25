import styles from "./index.module.scss";

interface DockBarProps {
  open: boolean;
  onClose: () => void;
}
const DockBar = ({ open, onClose }: DockBarProps) => {
  return (
    <>
      {open && (
        <div
          className={styles["dockbar-wrapper"]}
          onClick={() => console.log("h")}
          onBlur={onClose}
          tabIndex={0}
        >
          <div className={styles["dockbar-wrapper_left"]}>Windows95</div>
        </div>
      )}
    </>
  );
};

export default DockBar;
