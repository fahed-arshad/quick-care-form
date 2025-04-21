/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Alert,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { TextField, InputLabel, FormHelperText } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useFormStore } from "../utils/store";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ConsultationStepper from "../components/ConsultationStepper";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { PharmacyStoreData, usePharmacyStore } from "../utils/pharmacyStore";

interface LoginFormInputs {
  pharmacyEmail: string;
  pin: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const theme = useTheme();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { updatePharmacy, resetPharmacy } = usePharmacyStore();
  const [open, setModalOpen] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post<PharmacyStoreData>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy-login`,
        {
          email: data.pharmacyEmail,
          pin: data.pin,
        }
      );

      resetPharmacy();

      updatePharmacy({
        pharmacyId: response.data.pharmacyId,
        pharmacyName: response.data.pharmacyName,
        pharmacyEmail: response.data.pharmacyEmail,
        token: response.data.token,
      });

      router.push(`/?token=${response.data.token}`);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
        setError("root", { message: error.response?.data });
      }
    }
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{
              padding: { xs: 2, sm: 6 },
              marginTop: { xs: 0, sm: 10, md: 1 },
            }}
          >
            <Grid size={{ xs: 12 }}>
              <Typography fontSize={32} textAlign="center">
                Login to Quick Care
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Alert severity="warning" variant="filled">
                If you are a customer and you are seeing this, please contact
                pharmacy staff.
              </Alert>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Alert severity="info" variant="filled">
                You can find your pin on the Quick Care dashboard under the
                settings tab. You will only need to do this once.
              </Alert>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel
                htmlFor="email"
                margin="dense"
                sx={{ marginBottom: 0 }}
                required
              >
                Pharmacy Email
              </InputLabel>
              <TextField
                id="email"
                type="email"
                fullWidth
                error={errors.root ? true : false}
                required
                {...register("pharmacyEmail", {
                  required: true,
                })}
                onChange={() => {
                  clearErrors();
                }}
                placeholder="Enter your pharmacy email"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel
                htmlFor="pin"
                margin="dense"
                sx={{ marginBottom: 0 }}
                required
              >
                Pin
              </InputLabel>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  id="pin"
                  fullWidth
                  required
                  error={errors.root ? true : false}
                  type={showPassword ? "text" : "password"}
                  {...register("pin", { required: true })}
                  onChange={() => {
                    clearErrors();
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.root?.message && (
                <FormHelperText>
                  <Typography color="error" marginTop={1}>
                    {errors.root.message}
                  </Typography>
                </FormHelperText>
              )}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" fullWidth>
                Login to form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fade>
    </Stack>
  );
}
