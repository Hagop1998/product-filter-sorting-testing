import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <ClipLoader size={40} color="#007bff" />
    </div>
  );
}
