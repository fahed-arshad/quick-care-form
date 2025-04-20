"use client";
import {
  Stack,
  Fade,
  Typography,
  Button,
  InputLabel,
  TextField,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { GpSurgery } from "./page";
import { filterOptions } from "./helpers/filterOptions";
import { LoadingButton } from "@mui/lab";
import { Data, useFormStore } from "../utils/store";

export default function ContactForm({
  gpSurgeries,
}: {
  gpSurgeries: Array<GpSurgery>;
}) {
  const router = useRouter();
  const [selectedGp, setSelectedGp] = useState<GpSurgery | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { formData, updateForm, resetForm } = useFormStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      gpSurgery: formData.gpSurgery,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      remoteExemption: formData.remoteExemption,
    },
  });

  const onSubmit = async (data: Data) => {
    updateForm({
      gpSurgery: data.gpSurgery,
      mobileNumber: data.mobileNumber,
      email: data.email,
      remoteExemption: data.remoteExemption,
    });

    const {
      fullAddress: { ADDRESS, POSTCODE, UPRN, UDPRN, POST_TOWN },
      symptoms,
      duration,
      experiencedSymptomsBefore,
      previousSymptomsDetails,
      additionalInfo,
      forenames,
      surname,
      dateOfBirth,
      sex,
    } = formData;

    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-form`, {
        ADDRESS,
        POSTCODE,
        UPRN,
        UDPRN,
        POST_TOWN,
        symptoms,
        duration,
        experiencedSymptomsBefore,
        previousSymptomsDetails,
        additionalInfo,
        mobileNumber: data.mobileNumber,
        gpSurgery: data.gpSurgery,
        email: data.email,
        fullName: `${forenames} ${surname}`.trim(),
        forenames,
        surname,
        dateOfBirth,
        sex,
        channel: process.env.NEXT_PUBLIC_CHANNEL
          ? process.env.NEXT_PUBLIC_CHANNEL
          : "Kiosk",
      });
      resetForm();
      localStorage.clear();
      router.push("/success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={2} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="surgeryName" required margin="dense">
                GP Surgery
              </InputLabel>
              <Controller
                name="gpSurgery"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    autoHighlight
                    options={gpSurgeries}
                    filterOptions={filterOptions}
                    getOptionLabel={({ gpPracticeName }) => gpPracticeName}
                    value={
                      selectedGp
                        ? selectedGp
                        : formData.gpSurgery &&
                          Object.keys(formData.gpSurgery).length > 0
                        ? formData.gpSurgery
                        : null
                    }
                    onChange={(_, newValue) => {
                      setSelectedGp(newValue);
                      field.onChange(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    clearOnEscape
                    renderInput={(params) => <TextField {...params} required />}
                    renderOption={(props, option) => {
                      const { key, ...optionProps } = props;
                      return (
                        <Stack key={option.id} component="li" {...optionProps}>
                          <Typography fontSize={20}>
                            {option.gpPracticeName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            fontSize={16}
                          >
                            {option.addressLine4
                              ? option.addressLine4
                              : option.addressLine3}
                          </Typography>
                        </Stack>
                      );
                    }}
                  />
                )}
              />
              <FormHelperText>
                ⓘ Start typing in the name of your GP Surgery ☝️
              </FormHelperText>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="phoneNumber" required margin="dense">
                Phone Number
              </InputLabel>
              <TextField
                id="phoneNumber"
                fullWidth
                required
                {...register("mobileNumber", {
                  required: true,
                  pattern:
                    /^(?:\+44|44|0)\s?(?:7\d{3}\s?\d{6}|1\d{3}\s?\d{5,6}|2\d{3}\s?\d{5,6}|3\d{3}\s?\d{5,6}|\d{4}\s?\d{6})$/,
                })}
                type="tel"
                error={errors.mobileNumber?.type === "pattern" ? true : false}
                helperText={
                  errors.mobileNumber?.type === "pattern"
                    ? "ⓘ Please provide a valid UK phone number"
                    : "ⓘ Please provide your mobile number"
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="email" margin="dense" required>
                Email
              </InputLabel>
              <TextField
                id="email"
                fullWidth
                required
                {...register("email")}
                type="email"
              />
            </Grid>
            {process.env.NEXT_PUBLIC_CHANNEL === "Online" ? (
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      {...register("remoteExemption", {
                        required: true,
                      })}
                      defaultChecked
                    />
                  }
                  label="I confirm that I am unable to attend the pharmacy in person right now."
                />
              </Grid>
            ) : null}
            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              direction={{ xs: "row-reverse" }}
              marginTop={3}
            >
              <Grid size={{ md: 6, xs: 12 }}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={loading}
                  variant="contained"
                  endIcon={<EastRoundedIcon />}
                >
                  Submit
                </LoadingButton>
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    ":hover": { backgroundColor: "white" },
                  }}
                  onClick={() => {
                    router.push("/personal-details");
                  }}
                >
                  Previous
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Fade>
    </Stack>
  );
}
