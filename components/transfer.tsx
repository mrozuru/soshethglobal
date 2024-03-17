interface color {
  color: string;
}

const Transfer = ({ color }: color) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3333 1.66663V12.3333M10.3333 12.3333L7.66667 9.66663M10.3333 12.3333L13 9.66663M3.66667 12.3333V1.66663M3.66667 1.66663L1 4.33329M3.66667 1.66663L6.33333 4.33329"
        stroke={color || ""}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Transfer;
