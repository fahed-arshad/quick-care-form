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
import { format, parse } from "date-fns";
import { useEffect } from "react";

export interface PersonalDetailsData {
  fullName: string;
  dateOfBirth: any;
  sex: string;
}

export default function PersonalDetails() {
  const router = useRouter();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PersonalDetailsData>();

  useEffect(() => {
    const existingData: PersonalDetailsData = JSON.parse(
      sessionStorage.getItem("personalDetails") || "{}"
    );

    if (existingData) {
      setValue("fullName", existingData.fullName);
      if (existingData.dateOfBirth) {
        setValue(
          "dateOfBirth",
          parse(existingData.dateOfBirth, "dd/MM/yyyy", new Date())
        );
      }
      setValue("sex", existingData.sex);
    }
  }, [setValue]);
  const onSubmit = (formData: PersonalDetailsData) => {
    if (formData.dateOfBirth) {
      formData.dateOfBirth = format(
        new Date(formData.dateOfBirth),
        "dd/MM/yyyy"
      );
    }
    formData.fullName = formData.fullName.toUpperCase();
    sessionStorage.setItem("personalDetails", JSON.stringify(formData));
    router.push("/contact");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack alignItems="center" marginTop={5}>
        <ConsultationStepper activeStep={1} />
        <Fade in timeout={300}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid container spacing={2} justifyContent="center" padding={6}>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="fullName" required margin="dense">
                  Full Name
                </InputLabel>
                <TextField
                  id="fullName"
                  fullWidth
                  required
                  {...register("fullName", {
                    required: true,
                  })}
                  slotProps={{
                    htmlInput: {
                      style: { textTransform: "uppercase" },
                    },
                  }}
                  error={!!errors.fullName}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="dateOfBirth" required margin="dense">
                  Date of Birth
                </InputLabel>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={null}
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
                      router.push("/additional-information");
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
