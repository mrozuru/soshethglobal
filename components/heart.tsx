interface active {
  active: boolean;
  comment: boolean;
}

const Heart = ({ active, comment }: active) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.4209 4C22.3149 4 24.9314 7.725 24.9314 11.2C24.9314 18.2375 14.0724 24 13.8759 24C13.6793 24 2.82031 18.2375 2.82031 11.2C2.82031 7.725 5.43679 4 9.33081 4C11.5665 4 13.0283 5.1375 13.8759 6.1375C14.7235 5.1375 16.1853 4 18.4209 4Z"
        stroke={active ? "" : comment ? "#667085" : "white"}
        fill={active ? "red" : ""}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Heart;
