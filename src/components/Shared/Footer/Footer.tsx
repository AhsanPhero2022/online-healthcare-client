import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" justifyContent="center" gap={4}>
          <Typography color="#fff" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="#fff">Health Plans</Typography>
          <Typography color="#fff">Medicine</Typography>
          <Typography color="#fff">Diagnostics</Typography>
          <Typography color="#fff">NGOs</Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" gap={4}>
          <Image src={facebookIcon} alt="facebook" />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
