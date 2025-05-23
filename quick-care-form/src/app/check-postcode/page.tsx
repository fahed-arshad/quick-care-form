/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Button,
  Fade,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ConsultationStepper from "../components/ConsultationStepper";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { AddressData, AddressDataSession, useFormStore } from "../utils/store";
import { usePharmacyStore } from "../utils/pharmacyStore";

interface PostcodeData {
  postcode: string;
  fullAddress: string;
}

export default function CheckPostcode() {
  const [loading, setLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>("none");
  const { updateForm } = useFormStore();
  const {
    data: { token },
  } = usePharmacyStore();
  const [addressOptions, setAddressOptions] = useState<AddressData[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PostcodeData>();

  const onSubmit = async (formData: PostcodeData) => {
    try {
      if (formData.fullAddress) {
        updateForm({
          postcode: formData.postcode,
          fullAddress: JSON.parse(formData.fullAddress) as AddressDataSession,
        });
        return router.push(`/describe-symptoms?token=${token}`);
      }
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/postcode-check`,
          {
            postcode: formData.postcode.trim().toUpperCase(),
          }
        );
        if (data === false) {
          setLoading(false);
          return setError("postcode", {
            type: "validate",
            message:
              "Sorry! We only offer these services in Scotland. If you have any concerns, pharmacy staff are always happy to help.",
          });
        }
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            return setError("postcode", {
              type: "validate",
              message:
                "We couldn't find your postcode. 😔 Please make sure you have entered the correct postcode. If you need further assistance, please contact a member of staff who would be happy to help.",
            });
          }
        }
        return setError("postcode", {
          type: "validate",
          message:
            "There was an error finding your address. Please contact staff for further assistance.",
        });
      }

      const addresses = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/os-places`,
        {
          postcode: formData.postcode,
        }
      );
      setAddressOptions(addresses.data);
      setDisplay("block");
      setLoading(false);
    } catch (error) {}
  };

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={0} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={2} sx={{ padding: { xs: 2, sm: 6 } }}>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="postcode" required margin="dense">
                To find out if you&apos;re eligible for these NHS services,
                please provide your postcode. 📮
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
                onChange={() => {
                  setDisplay("none");
                  clearErrors();
                }}
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
            {display === "block" && (
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="address-label" required>
                  Thanks! 😊 Please select your address from the list below 👇
                </InputLabel>
                <FormControl fullWidth sx={{ height: "100%" }}>
                  <Select
                    fullWidth
                    labelId="address-label"
                    placeholder="Select your address"
                    required
                    {...register("fullAddress", { required: true })}
                    sx={{
                      backgroundColor: "white",
                      whiteSpace: "normal!important",
                      "& .MuiSelect-select": { whiteSpace: "normal!important" },
                    }}
                    error={!!errors.fullAddress?.message}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                  >
                    {addressOptions.map((address, index) => (
                      <MenuItem
                        key={index}
                        value={JSON.stringify(address.DPA)}
                        sx={{
                          whiteSpace: "normal",
                          padding: "20px",
                          fontSize: "24px",
                        }}
                      >
                        {address?.DPA?.ADDRESS}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.fullAddress?.message ? (
                    <FormHelperText>
                      <Typography color="error">
                        Please select an address
                      </Typography>
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
            )}

            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              marginTop={3}
              direction={{ xs: "row-reverse" }}
            >
              <Grid size={{ md: 6, xs: 12 }}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  endIcon={<EastRoundedIcon />}
                >
                  {display === "block" ? "Next" : "Check"}
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
                    router.push(`/?token=${token}`);
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
