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

export interface PersonalDetailsData {
  fullName: string;
  dateOfBirth: any;
  sex: string;
}

export default function PersonalDetails() {
  const router = useRouter();
  const { fullName, dateOfBirth, sex }: PersonalDetailsData = JSON.parse(
    sessionStorage.getItem("personalDetails") || "{}"
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalDetailsData>({
    defaultValues: {
      fullName: fullName ?? null,
      dateOfBirth: dateOfBirth
        ? parse(dateOfBirth, "dd/MM/yyyy", new Date())
        : null,
      sex: sex ?? null,
    },
  });

  const onSubmit = (formData: PersonalDetailsData) => {
    if (formData.dateOfBirth) {
      formData.dateOfBirth = format(
        new Date(formData.dateOfBirth),
        "dd/MM/yyyy"
      );
    }
    sessionStorage.setItem("personalDetails", JSON.stringify(formData));
    router.push("/contact");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack alignItems="center" marginTop={5}>
        <ConsultationStepper activeStep={1} />
        <Fade in timeout={300}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid container spacing={2} justifyContent="center" padding={2}>
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
                  placeholder="Enter full name"
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
                  control={control}
                  defaultValue={sex ?? ""}
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
              </Grid>
              <Grid
                container
                size={{ xs: 12 }}
                spacing={2}
                direction={{ xs: "row-reverse" }}
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
