"use client";
import {
  Stack,
  Fade,
  Typography,
  Button,
  InputLabel,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
  useTheme,
  ListItem,
  List,
  IconButton,
  ListItemText,
} from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Data, FileStore, useFileStore, useFormStore } from "../utils/store";
import { usePharmacyStore } from "../utils/pharmacyStore";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export interface TreatmentsTriedData {
  experiencedSymptomsBefore: string;
  previousSymptomsDetails: string;
}

export default function Symptoms() {
  const router = useRouter();
  const [alignment, setAlignment] = useState<string | null>(null);
  const [display, setDisplay] = useState<string>("none");

  const { formData, updateForm } = useFormStore();
  const {
    data: { token },
  } = usePharmacyStore();

  const { files, fileToggle, setFiles, removeFile } = useFileStore();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FileStore>({
    defaultValues: {
      files,
      fileToggle,
      setFiles,
      removeFile,
    },
  });

  useEffect(() => {
    if (fileToggle) {
      setAlignment("Yes");
      setDisplay("block");
    }
  }, [fileToggle]);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === "Yes") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
    setAlignment(newAlignment);
  };

  const onSubmit = (formData: FileStore) => {
    router.push(`/personal-details?token=${token}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    clearErrors("files"); // Clear any previous errors
    const newFiles = Array.from(event.target.files);

    const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB limit
    const ALLOWED_EXTENSIONS =
      /\.(pdf|docx?|xlsx?|txt|rtf|jpg|jpeg|png|tiff|csv)$/i;

    // Validate file types
    const invalidFiles = newFiles.filter(
      (file) => !ALLOWED_EXTENSIONS.test(file.name)
    );

    if (invalidFiles.length > 0) {
      setError("files", {
        message:
          "Some files have invalid formats. We accept the following formats: .pdf, .doc, .docx, .xls, .xlsx, .txt, .rtf, .jpg, .jpeg, .png, .tiff, .csv",
      });
      return;
    }

    // Calculate the total file size including new files
    const newTotalSize =
      files.reduce((acc, file) => acc + file.size, 0) +
      newFiles.reduce((acc, file) => acc + file.size, 0);

    // If total size exceeds 10MB, prevent upload
    if (newTotalSize > MAX_TOTAL_SIZE) {
      setError("files", {
        message: "Total file upload size cannot exceed 10MB.",
      });
      return;
    }

    setFiles([...files, ...newFiles]); // Update Zustand store

    event.target.value = ""; // Reset input to allow re-uploading the same file
  };

  return (
    <Stack alignItems="center" marginTop={5} marginBottom={10}>
      <ConsultationStepper activeStep={4} useSymptomsSteps />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="priorSymptoms" margin="dense">
                Would you like to upload an image of your symptoms? 📷
                <FormHelperText>
                  If it&apos;s relevant to your concern, uploading an image can
                  help the pharmacist understand your symptoms more clearly.
                </FormHelperText>
              </InputLabel>
              <ToggleButtonGroup
                id="priorSymptoms"
                exclusive
                fullWidth
                value={alignment}
                {...register("fileToggle", {
                  required: true,
                })}
                onChange={handleAlignment}
                aria-required
              >
                <ToggleButton value="Yes">Yes</ToggleButton>
                <ToggleButton value="No" sx={{ borderLeft: "1px solid black" }}>
                  No
                </ToggleButton>
              </ToggleButtonGroup>
              {errors.fileToggle ? (
                <FormHelperText>
                  <Typography color="error" marginTop={1}>
                    ⓘ Please select an option
                  </Typography>
                </FormHelperText>
              ) : (
                <FormHelperText>
                  <Typography marginTop={1}>
                    ⓘ Tap to select an option
                  </Typography>
                </FormHelperText>
              )}
            </Grid>
            {display === "block" && (
              <Grid size={{ xs: 12 }}>
                <Button
                  component="label"
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    ":hover": { backgroundColor: "white" },
                  }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload images
                  <VisuallyHiddenInput
                    id="image-file-upload"
                    type="file"
                    accept=".pdf, .doc, .docx, .xls, .xlsx, .txt, .rtf, .jpg, .jpeg, .png, .tiff, .csv"
                    onChange={handleFileUpload}
                    multiple
                  />
                </Button>
                <FormHelperText>
                  Total upload size cannot exceed 10mb.
                </FormHelperText>
                {errors.files && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.files.message}
                  </FormHelperText>
                )}

                <Grid size={{ xs: 12 }}>
                  {files.length > 0 && (
                    <List>
                      {files.map((file, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              onClick={() => removeFile(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={file.name}
                            secondary={`${(file.size / 1024 / 1024).toFixed(
                              2
                            )} MB`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Grid>
              </Grid>
            )}
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
                    router.push(`/duration?token=${token}`);
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
