import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import SidebarItem from "./SidebarItem";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        py={1}
        mt={1}
      >
        <Image src={assets.svgs.logo} width={40} height={40} alt="" />
        <Typography variant="h6" component="h1">
          PH Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
