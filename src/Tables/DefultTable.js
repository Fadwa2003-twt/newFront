import React, { useState } from "react";
import "./style.css";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import PagenationComponent from "./ComponentsTable/PagenationComponent";

function DefaultTable({ data, loading,onPageChange,currentPage = 1,itemsPerPage,totalItems }) {
  const rowsPerPage = itemsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Remove HTML tags
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  // Handle page change
  // const handlePageChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNumberPage = (page) => {
        if (page > 0) {
            onPageChange(page);
        }
    };

  // Slice data to display only rows for the current page
    const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="mt-10 relative overflow-x-auto">
      <h2
        className="text-2xl font-bold"
        style={{
          color: "#111",
          fontSize: "28px",
          fontWeight: 500,
          fontFamily: "Katibeh",
        }}
      >
        جدول المهام
      </h2>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 5,
          mt: 5,
          height: 35,
          width: 300,
          borderRadius: 2,
          backgroundColor: "#A6CDD7",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton sx={{ p: 0, ml: 1 }}>
          <SearchIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
        </IconButton>
        <Box
          sx={{
            height: "80%",
            width: "1px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          placeholder="البحث"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              border: "none",
              outline: "none",
              padding: 0,
              color: "#fff",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              paddingLeft: 1,
              paddingRight: 1,
            },
            "& .MuiInputBase-input": {
              height: 35,
              fontSize: "1rem",
              fontWeight: 700, // Make the text bold
            },
          }}
        />
      </Box>
      <table className="w-full text-sm text-right ltr:text-left text-gray-500 dark:text-gray-400">
        <thead
          className="table-font text-primary text-gray-900 uppercase dark:text-gray-400 title-table-font"
          style={{
            fontFamily: "Katibeh",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "33.6px",
            textAlign: "right",
            color: "#498696",
          }}
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              العنوان
            </th>
            <th scope="col" className="px-6 py-3">
              الموظف
            </th>
            <th scope="col" className="px-6 py-3">
              الفريق
            </th>
            <th scope="col" className="px-6 py-3">
              موعد التسليم
            </th>
            <th scope="col" className="px-6 py-3">
              الحالة
            </th>
            <th scope="col" className="px-6 py-3">
              الوصف
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <tr key={item._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-ellipsis overflow-hidden max-w-[150px]"
                  style={{
                    fontFamily: "Katibeh",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                    textAlign: "right",
                    color: "#424141",
                  }}
                >
                  {item.name}
                </th>
                <td
                  className="px-6 py-4 text-ellipsis overflow-hidden max-w-[150px]"
                  style={{
                    fontFamily: "Katibeh",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                    textAlign: "right",
                    color: "#424141",
                  }}
                >
                  {item.assignTo?.name || "غير محدد"}
                </td>
                <td
                  className="px-6 py-4 text-ellipsis overflow-hidden max-w-[150px]"
                  style={{
                    fontFamily: "Katibeh",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                    textAlign: "right",
                    color: "#424141",
                  }}
                >
                  {item.team || "غير محدد"}
                </td>
                <td
                  className="px-6 py-4 text-ellipsis overflow-hidden max-w-[150px]"
                  style={{
                    fontFamily: "Katibeh",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                    textAlign: "right",
                    color: "#424141",
                  }}
                >
                  {formatDate(item.deadline)}
                </td>
                <td
                  className="px-6 py-4 text-ellipsis overflow-hidden max-w-[150px]"
                  style={{
                    fontFamily: "Katibeh",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                    textAlign: "right",
                    color: item.isDone ? "#424141" : "#C72828", // Conditional color based on item.isDone
                  }}
                >
                  {item.isDone ? "تمت" : "لم تنتهي بعد"}
                </td>
                <td
                  className="px-6 py-4 max-w-[200px]"
                  style={{
                    fontFamily: "Katibeh",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "33.6px",
                    textAlign: "right",
                    color: "#424141",
                  }}
                >
                  <div
                    className="whitespace-pre-wrap overflow-auto text-ellipsis max-h-20"
                    style={{ maxWidth: "200px" }}
                  >
                    {stripHtmlTags(item.description)}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-5 mb-5">
          <PagenationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              handleNumberPage={handleNumberPage}
              handelNext={handleNext}
              onPageChange={onPageChange}
              handelPrevious={handlePrevious}
          />
      </div>
    </div>
  );
}

export default DefaultTable;
