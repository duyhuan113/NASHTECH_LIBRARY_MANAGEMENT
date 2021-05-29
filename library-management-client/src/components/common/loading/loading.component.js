import { Spin } from "antd";
import "./loading.style.css";

const LoadingComponent = () => {
  return (
    <div className="loading">
      <Spin />
    </div>
  );
};

export default LoadingComponent;
