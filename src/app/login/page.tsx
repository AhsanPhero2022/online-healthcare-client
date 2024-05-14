"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import assets from "@/assets/";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginPatient } from "@/services/actions/loginPatient";
import { storeUserInfo } from "@/services/auth.services";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await loginPatient(values);
      console.log(res);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res.data.accessToken });
      }
    } catch (err: any) {
      console.log(err.massage);
    }
  };

  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login Health Care
              </Typography>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} my={1}>
                  <Grid item md={6}>
                    <TextField
                      label="Email"
                      type="Email"
                      variant="outlined"
                      size="small"
                      fullWidth={true}
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label="Password"
                      type="Password"
                      variant="outlined"
                      size="small"
                      fullWidth={true}
                      {...register("password")}
                    />
                  </Grid>
                </Grid>

                <Typography
                  textAlign="end"
                  mb={1}
                  component="p"
                  fontWeight={300}
                >
                  Forgot Password?
                </Typography>

                <Button
                  sx={{
                    margin: "10px 0px",
                  }}
                  fullWidth={true}
                  type="submit"
                >
                  Login
                </Button>
                <Typography component="p" fontWeight={300}>
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Create an account</Link>
                </Typography>
              </form>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
