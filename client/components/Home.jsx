import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { outlinedInputClasses } from "@mui/material";

function renderRow(props, ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      divider="true"
    >
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <div className=".cardWrap">
      <Box
        sx={{
          borderRadius:"50%",
          borderRadius:"borderRadius",
          borderRadius: 2,
          color: "#1769aa",
          boxShadow: 10,
          mt: 2,
          mr:2,
          border: 4,
          width: "100%",
          height: 400,
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={200}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
}
