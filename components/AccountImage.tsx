interface active {
  active: boolean;
}

const AccountImage = ({ active }: active) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="user-02">
        <g id="Icon">
          <path
            d="M14.9998 18.75C11.0372 18.75 7.51331 20.6633 5.26981 23.6325C4.78694 24.2715 4.54551 24.591 4.55341 25.0229C4.55951 25.3565 4.76901 25.7774 5.03152 25.9834C5.3713 26.25 5.84215 26.25 6.78385 26.25H23.2158C24.1575 26.25 24.6283 26.25 24.9681 25.9834C25.2306 25.7774 25.4401 25.3565 25.4462 25.0229C25.4541 24.591 25.2127 24.2715 24.7298 23.6325C22.4863 20.6633 18.9624 18.75 14.9998 18.75Z"
            stroke={active ? "#35383F" : "#98A2B3"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9998 15C18.1064 15 20.6248 12.4816 20.6248 9.375C20.6248 6.2684 18.1064 3.75 14.9998 3.75C11.8932 3.75 9.37481 6.2684 9.37481 9.375C9.37481 12.4816 11.8932 15 14.9998 15Z"
            stroke={active ? "#35383F" : "#98A2B3"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default AccountImage;
