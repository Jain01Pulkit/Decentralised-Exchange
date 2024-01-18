import React from "react";
import { Button, Input } from "antd";
import "./SearchBar.scss";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = (props) => {
  const onSearch = (value) => console.log(value);

  return (
    <>
      <div className={`search_item ${props.className}`}>
        <span className="select_title">{props.title}</span>
        <Input
          placeholder={props.placeholder}
          onSearch={onSearch}
          className="search_input"
        />
        <Button className="secrh_btn">
          <SearchOutlined />
        </Button>
      </div>
    </>
  );
};

export { SearchBar };
