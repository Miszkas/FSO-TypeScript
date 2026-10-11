import { useState } from "react";

const Togglable = ({
  children,
  buttonLabel,
}: {
  children: React.ReactNode;
  buttonLabel: string;
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? "cancel" : buttonLabel}
      </button>
      {visible && <div>{children}</div>}
    </div>
  );
};

export default Togglable;
