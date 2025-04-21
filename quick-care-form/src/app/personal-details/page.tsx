"use client";
import {
  Stack,
  Fade,
  Button,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  useTheme,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { format, parseISO } from "date-fns";
import { Data, useFormStore } from "../utils/store";
import { usePharmacyStore } from "../utils/pharmacyStore";

export interface PersonalDetailsData {
  forenames: string;
  surname: string;
  dateOfBirth: any;
  sex: string;
}

export default function PersonalDetails() {
  const router = useRouter();
  const theme = useTheme();

  const { formData, updateForm } = useFormStore();
  const {
    data: { token },
  } = usePharmacyStore();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      forenames: formData.forenames,
      surname: formData.surname,
      dateOfBirth:
        typeof formData.dateOfBirth === "string"
          ? parseISO(formData.dateOfBirth)
          : formData.dateOfBirth,
      sex: formData.sex,
    },
  });

  const onSubmit = (formData: Data) => {
    formData.forenames = formData.forenames
      .trim()
      .split(" ") // Split the full name into an array of words by spaces
      .map(
        (word) =>
          word
            .split("-") // Split each word further by hyphen
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            ) // Capitalize each part of the hyphenated word
            .join("-") // Rejoin the hyphenated word
      )
      .join(" "); // Rejoin the full name

    formData.surname = formData.surname
      .trim()
      .split(" ") // Split the full name into an array of words by spaces
      .map(
        (word) =>
          word
            .split("-") // Split each word further by hyphen
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            ) // Capitalize each part of the hyphenated word
            .join("-") // Rejoin the hyphenated word
      )
      .join(" "); // Rejoin the full name

    updateForm({
      forenames: formData.forenames,
      surname: formData.surname,
      dateOfBirth: formData.dateOfBirth
        ? format(formData.dateOfBirth, "yyyy-MM-dd")
        : undefined,
      sex: formData.sex,
    });
    router.push(`/contact?token=${token}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack alignItems="center" marginTop={5}>
        <ConsultationStepper activeStep={1} />
        <Fade in timeout={300}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: { xs: 2, sm: 6 } }}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputLabel htmlFor="forename" required margin="dense">
                  First Name
                </InputLabel>
                <TextField
                  id="forename"
                  fullWidth
                  required
                  autoComplete="given-name"
                  {...register("forenames", {
                    required: true,
                  })}
                  error={!!errors.forenames}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputLabel htmlFor="surname" required margin="dense">
                  Surname
                </InputLabel>
                <TextField
                  id="surname"
                  fullWidth
                  required
                  autoComplete="family-name"
                  {...register("surname", {
                    required: true,
                  })}
                  error={!!errors.surname}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="dateOfBirth" required margin="dense">
                  Date of Birth
                </InputLabel>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={undefined}
                  render={({ field }) => (
                    <DateField
                      fullWidth
                      clearable
                      required
                      format="dd/MM/yyyy"
                      slotProps={{
                        input: { startAdornment: <CalendarTodayIcon /> },
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="sex" required margin="dense">
                  Sex at birth
                </InputLabel>
                <Controller
                  name="sex"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={getValues("sex") ?? ""}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.sex?.type === "required" && (
                  <FormHelperText sx={{ color: theme.palette.error.main }}>
                    Please select an option
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                container
                size={{ xs: 12 }}
                spacing={2}
                direction={{ xs: "row-reverse" }}
                marginTop={3}
              >
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    endIcon={<EastRoundedIcon />}
                  >
                    Next
                  </Button>
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
                      router.push(`/additional-information?token=${token}`);
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
    </LocalizationProvider>
  );
}
