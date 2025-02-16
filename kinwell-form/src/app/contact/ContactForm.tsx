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
import { useEffect, useState } from "react";
import { GpSurgery } from "./page";
import { filterOptions } from "./helpers/filterOptions";
import { AddressDataSession } from "../check-postcode/page";
import { PersonalDetailsData } from "../personal-details/page";
import { LoadingButton } from "@mui/lab";
import { AdditionalInfoData } from "../additional-information/page";
import { DescribeSymptomData } from "../describe-symptoms/page";
import { DurationData } from "../duration/page";
import { TreatmentsTriedData } from "../treatments-tried/page";

interface ContactData {
  gpSurgery: GpSurgery;
  mobileNumber: string | null;
  email?: string;
  remoteExemption: boolean;
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
    setValue,
    formState: { errors },
  } = useForm<ContactData>();

  useEffect(() => {
    const existingData: ContactData = JSON.parse(
      sessionStorage.getItem("contactDetails") || "{}"
    );

    if (existingData) {
      setValue("mobileNumber", existingData.mobileNumber);
      if (existingData.email) {
        setValue("email", existingData.email);
      }
      setValue("gpSurgery", existingData.gpSurgery);
    }
  }, [setValue]);

  const onSubmit = async (formData: ContactData) => {
    sessionStorage.setItem("contactDetails", JSON.stringify(formData));

    const { ADDRESS, POSTCODE, UPRN, UDPRN, POST_TOWN }: AddressDataSession =
      JSON.parse(sessionStorage.getItem("address") || "{}");
    const { symptoms }: DescribeSymptomData = JSON.parse(
      sessionStorage.getItem("symptoms") || "{}"
    );

    const { duration }: DurationData = JSON.parse(
      sessionStorage.getItem("duration") || "{}"
    );

    const {
      experiencedSymptomsBefore,
      previousSymptomsDetails,
    }: TreatmentsTriedData = JSON.parse(
      sessionStorage.getItem("treatmentsTried") || "{}"
    );

    const { additionalInfo }: AdditionalInfoData = JSON.parse(
      sessionStorage.getItem("additionalInfo") || "{}"
    );
    const { mobileNumber, gpSurgery, email }: ContactData = JSON.parse(
      sessionStorage.getItem("contactDetails") || "{}"
    );

    const { forenames, surname, dateOfBirth, sex }: PersonalDetailsData =
      JSON.parse(sessionStorage.getItem("personalDetails") || "{}");

    const pharmacy = sessionStorage.getItem("pharmacy");

    const channel = sessionStorage.getItem("channel");

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
        mobileNumber,
        gpSurgery,
        email,
        fullName: `${forenames} ${surname}`.trim(),
        forenames,
        surname,
        dateOfBirth,
        sex,
        pharmacy,
        channel,
      });
      sessionStorage.clear();
      if (channel === "Online") {
        router.push("/success-online");
      }

      router.push("/success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const channel = sessionStorage.getItem("channel");

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
                {...register("email")}
                type="email"
              />
            </Grid>
            {channel === "Online" ? (
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
                  label="I confirm that I am unable to attend the pharmacy in person for a valid reason."
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
