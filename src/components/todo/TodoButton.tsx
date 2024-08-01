const buttonBaseStyle = {
  borderRadius: 15,
  cursor: "pointer",
  display: "block",
  border: "none",
  // margin: '1rem auto',
  padding: "0.5rem 1rem",
  backgroundColor: "#25597A",
  fontSize: "1rem",
  transition: "background-color 0.3s",
  color: 'white',
  fontStyle: 'italic',
  transform: "scale(1)",
};

const buttonHoverStyle = {
  backgroundColor: "#017A73",
  transform: "scale(1.05)",
};

const TodoButton = ({
  onClick,
  title,
  centered = true,
}: {
  onClick: () => void;
  title: string;
  centered?: boolean;
}) => {
  const buttonStyle = { ...buttonBaseStyle, ...(centered ? { margin: '1rem auto' } : {margin: '1rem 0'}) };
  return (
    <button 
      style={buttonStyle} 
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor, e.currentTarget.style.transform = buttonHoverStyle.transform)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor, e.currentTarget.style.transform = buttonStyle.transform)}
      >
      {title}
    </button>
  );
};

export default TodoButton;
