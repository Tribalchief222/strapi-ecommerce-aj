import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import Item from "../../components/item";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  console.log(items);

  const handleClick = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getItems = async () => {
      const items = await fetch("http://127.0.0.1:1337/api/items?populate=*", {
        method: "GET",
      });
      const res = await items.json();
      dispatch(setItems(res.data));
    };
    getItems();
  }, []);

  const topRatedItems = items.filter(
    (item) => item.attributes.categoriy === "topRated"
  );

  const newArrivalsItems = items.filter(
    (item) => item.attributes.categoriy === "newArrivals"
  );

  const bestSellerItems = items.filter(
    (item) => item.attributes.categoriy === "bestSeller"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleClick}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="New Arrivals" value="newArrivals" />
        <Tab label="Best Seller" value="bestSeller" />
        <Tab label="Top Rated" value="topRated" />
      </Tabs>

      {/* Displaying Api Data */}
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}

        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}

        {value === "bestSeller" &&
          bestSellerItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}

        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
