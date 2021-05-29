import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import { Table, Tag, Space } from "antd";

import { GET_BY_ID } from "../../../api/apiServices";
import CurrentUserContext from "../../../contexts/currentUserContext";

const HistoryOrder = () => {
  const [orderData, setOrderData] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const { user } = currentUser;
  useEffect(() => {
    GET_BY_ID("orders", Number(user.nameid)).then((res) =>
      setOrderData(res.data)
    );
  }, []);

  const statusTag = (status) => {
    if (status === "reject") {
      return <Tag color="red">{status.toUpperCase()}</Tag>;
    } else {
      return <Tag color="green">{status.toUpperCase()}</Tag>;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => {
       return <span>{orderDetails.length}</span>;
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => statusTag(status),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/orderdetail/${record.id}`}>Detail</Link>
        </Space>
      ),
    },
  ];

  console.log(orderData);

  return (
    <>
      {orderData ? (
        <Table columns={columns} dataSource={orderData} />
      ) : (
        "loading..."
      )}
    </>
  );
};

export default HistoryOrder;
