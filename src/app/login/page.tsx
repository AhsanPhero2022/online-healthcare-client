"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import assets from "@/assets/";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { userLogin } from "@/services/actions/userLogin";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      console.log(res);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res.data.accessToken });
        router.push("/");
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
              <PHForm onSubmit={handleLogin}>
                <Grid container spacing={2} my={1}>
                  <Grid item md={6}>
                    <PHInput
                      name="email"
                      required={true}
                      label="Email"
                      type="Email"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <PHInput
                      name="password"
                      label="Password"
                      type="Password"
                      required={true}
                      fullWidth={true}
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
              </PHForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
