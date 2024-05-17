"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import assets from "@/assets/";
import Link from "next/link";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";
import { userLogin } from "@/services/actions/userLogin";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);

      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }

      // console.log(res);
    } catch (err: any) {
      console.log(err.massage);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
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
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <PHForm onSubmit={handleRegister}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput
                    label="Name"
                    required={true}
                    name="patient.name"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Email"
                    type="Email"
                    fullWidth={true}
                    name="patient.email"
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Password"
                    type="Password"
                    fullWidth={true}
                    name="password"
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Contact Number"
                    type="Tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                    required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Address"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
