import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ExcelDataService } from "../../services/User/ExcelData/index.service";

function UserHeader() {
  const [data, setData] = useState([]);
  const exportHandler = async () => {
    const res = await ExcelDataService.getExcelData();
    setData(res?.data);
  };
  useEffect(() => {
    exportHandler();
  }, []);

  const openWhatsAppEnquiry = (product) => {
    const { id, title, description, price } = product;
    const whatsappNumber = "9340517364"; // Replace with your WhatsApp number

    const message = `Product ID: ${id}\nTitle: ${title}\nDescription: ${description}\nPrice: ${price}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <div className="container flex w-full items-center">
        <h1>Excel Data Export</h1>
        <CSVLink data={data} className="btn btn-primary">
          Export Excel
        </CSVLink>
        <table className="table">
          <thead className="primary">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Thumbnail</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th> {/* Add a new column for WhatsApp enquiry */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.description.substring(0, 50)}...</td>
                <td>{item.brand}</td>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ maxWidth: "100px", borderRadius: "25px" }}
                  />
                </td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <button onClick={() => openWhatsAppEnquiry(item)}>
                    <i
                      style={{
                        fontSize: "24px",
                        color: "green",
                        border: "none",
                      }}
                      className="fa"
                    >
                      &#xf232;
                    </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserHeader;
