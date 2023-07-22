import { useRef, useEffect } from "react";

function ListAddress({ value }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);

  return (
    <code style={{ marginTop: "7px"}}>
      {`contract Kyc {
  uint256 value = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>

    {`;

            function read() public view returns (uint256) {
                return value;
            }

            function write(uint256 newValue) public {
                value = newValue;
            }
    }`}
    </code>
  );
}

export default ListAddress;
