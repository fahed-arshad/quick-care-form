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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { GpSurgery } from "./page";
import { filterOptions } from "../../contact/helpers/filterOptions";
import { PersonalDetailsData } from "../personal-details/page";
import { LoadingButton } from "@mui/lab";
import SignUpStepper from "@/app/components/SignUpStepper";
import { AddressDataSession } from "@/app/check-postcode/page";

interface ContactData {
  gpSurgery: GpSurgery;
  mobileNumber: string | null;
  fullAddress: string;
  email: string;
  postcode: string;
  receiveSmsMessages: boolean;
}

export default function SignUpContactForm({
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
    getValues,
    formState: { errors },
  } = useForm<ContactData>();

  useEffect(() => {
    const existingData: ContactData = JSON.parse(
      sessionStorage.getItem("signUpContactDetails") || "{}"
    );

    if (existingData) {
      setValue("mobileNumber", existingData.mobileNumber);
      if (existingData.email) {
        setValue("email", existingData.email);
      }
      if (existingData.gpSurgery) {
        // Preselect the GP surgery by setting both `selectedGp` and the form value
        const preselectedGp = gpSurgeries.find(
          (surgery) => surgery.id === existingData.gpSurgery.id
        );
        if (preselectedGp) {
          setSelectedGp(preselectedGp);
          setValue("gpSurgery", preselectedGp);
        }
      }
    }
  }, [setValue]);

  const onSubmit = async (formData: ContactData) => {
    sessionStorage.setItem("signUpContactDetails", JSON.stringify(formData));

    const { gpSurgery, mobileNumber, email, receiveSmsMessages } = formData;

    const {
      forenames,
      surname,
      dateOfBirth,
      sex,
      referral,
    }: PersonalDetailsData = JSON.parse(
      sessionStorage.getItem("signUpPersonalDetails") || "{}"
    );

    const { ADDRESS, POST_TOWN, UPRN, UDPRN, POSTCODE }: AddressDataSession =
      JSON.parse(sessionStorage.getItem("signUpAddressDetails") || "{}");

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/new-patient-sign-up`,
        {
          mobileNumber,
          surgeryName: gpSurgery.gpPracticeName,
          email,
          fullName: `${forenames} ${surname}`.trim(),
          forenames,
          surname,
          dateOfBirth,
          sex,
          fullAddress: ADDRESS,
          postcode: POSTCODE,
          city: POST_TOWN,
          addressLine1: ADDRESS,
          uprn: UPRN,
          udprn: UDPRN,
          nominatedPharmacy: true,
          referral,
          pharmacyName: "KinWell Pharmacy",
          receiveHealthcareUpdates: receiveSmsMessages ? true : false,
          receiveSmsMessages,
          newSignUp: true,
        }
      );
      sessionStorage.clear();
      router.push("/sign-up/success");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <SignUpStepper activeStep={2} />
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
                    : null
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
                {...register("email", { required: true })}
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    {...register("receiveSmsMessages", {
                      required: true,
                    })}
                    defaultChecked
                  />
                }
                label="I would like to receive SMS prescription collection reminders and KinWell Updates"
              />
            </Grid>
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
                    router.push("/sign-up/address");
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
