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
import { AddressDataSession } from "../check-postcode/page";
import { SymptomData } from "../symptoms/page";
import { PersonalDetailsData } from "../personal-details/page";
import { LoadingButton } from "@mui/lab";

interface ContactData {
  gpSurgery: GpSurgery;
  mobileNumber: string | null;
  email?: string;
}

export default function ContactForm({
  gpSurgeries,
}: {
  gpSurgeries: Array<GpSurgery>;
}) {
  const router = useRouter();
  const [selectedGp, setSelectedGp] = useState<GpSurgery | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactData>();

  const onSubmit = async (formData: ContactData) => {
    sessionStorage.setItem("contactDetails", JSON.stringify(formData));

    const { ADDRESS, POSTCODE, UPRN, UDPRN }: AddressDataSession = JSON.parse(
      sessionStorage.getItem("address") || "{}"
    );
    const {
      symptoms,
      duration,
      experiencedSymptomsBefore,
      previousSymptomsDetails,
    }: SymptomData = JSON.parse(sessionStorage.getItem("symptoms") || "{}");
    const additionalInfo = JSON.parse(
      sessionStorage.getItem("additionalInfo") || "{}"
    );
    const { mobileNumber, gpSurgery, email }: ContactData = JSON.parse(
      sessionStorage.getItem("contactDetails") || "{}"
    );

    const { fullName, dateOfBirth, sex }: PersonalDetailsData = JSON.parse(
      sessionStorage.getItem("personalDetails") || "{}"
    );

    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-form`, {
        ADDRESS,
        POSTCODE,
        UPRN,
        UDPRN,
        symptoms,
        duration,
        experiencedSymptomsBefore,
        previousSymptomsDetails,
        additionalInfo,
        mobileNumber,
        gpSurgery,
        email,
        fullName,
        dateOfBirth,
        sex,
      });
      sessionStorage.clear();
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
          <Grid container spacing={2} justifyContent="center" padding={2}>
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
                    value={selectedGp}
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
                          <Typography>{option.gpPracticeName}</Typography>
                          <Typography variant="body2" color="textSecondary">
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
              <FormHelperText>Start entering in your GP Surgery</FormHelperText>
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
                    ? "Please provide a valid UK phone number"
                    : null
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="email" margin="dense">
                Email
              </InputLabel>
              <TextField
                id="email"
                fullWidth
                {...register("email")}
                type="email"
              />
            </Grid>
            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              direction={{ xs: "row-reverse" }}
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
