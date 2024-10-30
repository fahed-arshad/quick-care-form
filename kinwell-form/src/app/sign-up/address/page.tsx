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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { filterOptions } from "../../contact/helpers/filterOptions";
import { PersonalDetailsData } from "../personal-details/page";
import { LoadingButton } from "@mui/lab";
import SignUpStepper from "@/app/components/SignUpStepper";
import SearchIcon from "@mui/icons-material/Search";
import { AddressData } from "@/app/check-postcode/page";

interface AddressDetailsData {
  fullAddress: string;
  postcode: string;
}

export default function SignUpContactForm() {
  const router = useRouter();
  const [addressOptions, setAddressOptions] = useState<AddressData[]>([]);
  const [isAddressDisabled, setIsAddressDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddressDetailsData>();

  const fetchAddressOptions = async (postcode: string) => {
    try {
      setAddressLoading(true);
      const addresses = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/os-places`,
        {
          postcode: postcode,
        }
      );
      setAddressOptions(addresses.data);
      setAddressLoading(false);
      setIsAddressDisabled(false); // Enable the address dropdown
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      setAddressOptions([]);
      setIsAddressDisabled(true);
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    const existingData: AddressDetailsData = JSON.parse(
      sessionStorage.getItem("signUpContactDetails") || "{}"
    );

    if (existingData) {
    }
  }, [setValue]);

  const onSubmit = async (formData: AddressDetailsData) => {
    sessionStorage.setItem("signUpAddressDetails", JSON.stringify(formData));

    router.push("/sign-up/contact");
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <SignUpStepper activeStep={1} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel htmlFor="postcode" required margin="dense">
                Postcode
              </InputLabel>
              <TextField
                id="postcode"
                fullWidth
                required
                slotProps={{
                  htmlInput: {
                    style: {
                      textTransform: "uppercase",
                    },
                  },
                }}
                {...register("postcode", {
                  required: true,
                  pattern:
                    /^\s*(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2}))\s*$/,
                })}
                placeholder="Postcode"
                error={errors.postcode ? true : false}
                helperText={
                  errors.postcode?.type === "pattern"
                    ? "Please provide a valid UK postcode"
                    : errors.postcode?.type === "validate"
                    ? errors.postcode.message
                    : "ⓘ This is the postcode that is registered with your GP"
                }
              ></TextField>
              <style jsx global>{`
                /* Capitalize only the placeholder */
                #postcode::placeholder {
                  text-transform: none;
                }
              `}</style>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} alignContent="center">
              <LoadingButton
                onClick={async (e) =>
                  await fetchAddressOptions(getValues().postcode.trim())
                }
                fullWidth
                loading={addressLoading}
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                }}
              >
                Search Address
              </LoadingButton>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel id="address-label" required>
                Select your address
              </InputLabel>
              <FormControl fullWidth sx={{ height: "100%", width: "100%" }}>
                <Select
                  fullWidth
                  disabled={isAddressDisabled}
                  labelId="address-label"
                  required
                  {...register("fullAddress", { required: true })}
                  sx={{
                    backgroundColor: "white",
                    whiteSpace: "normal!important",
                    "& .MuiSelect-select": { whiteSpace: "normal!important" },
                  }}
                  error={!!errors.fullAddress}
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                >
                  {addressOptions.map((address, index) => (
                    <MenuItem
                      key={index}
                      value={JSON.stringify(address.DPA)}
                      sx={{ whiteSpace: "normal" }}
                    >
                      {address?.DPA?.ADDRESS}
                    </MenuItem>
                  ))}
                </Select>
                {errors.fullAddress ? (
                  <FormHelperText>
                    <Typography color="error">
                      Please select an address
                    </Typography>
                  </FormHelperText>
                ) : null}
              </FormControl>
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
                    router.push("/sign-up/personal-details");
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
