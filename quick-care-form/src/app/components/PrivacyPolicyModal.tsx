import {
  Box,
  Button,
  Divider,
  Link,
  List,
  ListItem,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PrivacyPolicyModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "70vh",
    },
    height: "60vh",
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} overflow="auto">
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            zIndex: 1,
            paddingTop: 2,
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              gutterBottom
            >
              Privacy Policy for Pharma Pal
            </Typography>
            <Button onClick={handleClose} variant="outlined">
              <CloseIcon />
            </Button>
          </Box>
          <Divider />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Purpose of Data Collection
          </Typography>
          <Typography>
            At Pharma Pal, we collect personal health data to enhance your
            experience using our Pharmacy First service. The data helps us to:
          </Typography>
          <List>
            <ListItem>
              Provide personalised and efficient pharmacy consultations.
            </ListItem>
            <ListItem>
              Ensure accuracy in health advice and treatments.
            </ListItem>
            <ListItem>
              Customise your interactions to better meet your healthcare needs.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Types of Data Collected
          </Typography>
          <Typography>
            We collect the following types of personal health data:
          </Typography>
          <List>
            <ListItem>
              <strong>Personal Identification Information:</strong> Full name,
              date of birth, and contact details.
            </ListItem>
            <ListItem>
              <strong>Health Information:</strong> Specific symptoms, medical
              history, and other health-related information necessary for your
              consultation.
            </ListItem>
            <ListItem>
              <strong>General Practitioner (GP) Information:</strong> Name and
              contact details of your GP to ensure continuity of care.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Data Use
          </Typography>
          <Typography>
            The personal health data collected is used to:
          </Typography>
          <List>
            <ListItem>Conduct and manage effective consultations.</ListItem>
            <ListItem>
              Provide tailored health advice based on your specific symptoms and
              medical history.
            </ListItem>
            <ListItem>
              Improve and refine the services offered by Pharma Pal.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Data Sharing and Disclosure
          </Typography>
          <Typography>
            We only share your personal health data with third parties when
            necessary and in compliance with privacy laws. This includes:
          </Typography>
          <List>
            <ListItem>
              Healthcare providers, when coordination with your GP is required.
            </ListItem>
            <ListItem>
              IT service providers, strictly for the purpose of maintaining and
              improving our services.
            </ListItem>
            <ListItem>
              Legal disclosures when mandated by law or for security purposes.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Data Security Measures
          </Typography>
          <Typography>
            To protect your personal data, we implement robust security
            measures, including:
          </Typography>
          <List>
            <ListItem>Encryption of data both in transit and at rest.</ListItem>
            <ListItem>
              Secure data storage practices with access limited to authorised
              personnel only.
            </ListItem>
            <ListItem>
              Regular audits and compliance checks to ensure data protection
              standards are met.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            User Rights
          </Typography>
          <Typography>
            You have several rights regarding your personal data, including the
            right to:
          </Typography>
          <List>
            <ListItem>Access the data we hold about you.</ListItem>
            <ListItem>Request corrections to any inaccurate data.</ListItem>
            <ListItem>
              Request deletion of your data where appropriate.
            </ListItem>
            <ListItem>
              Withdraw consent for data processing at any time.
            </ListItem>
          </List>
          <Typography>
            To exercise these rights, please contact us directly through the
            provided contact details.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Consent and Withdrawal
          </Typography>
          <Typography>
            By using our service, you consent to the collection and use of your
            personal data as described in this document. You can withdraw your
            consent at any time by contacting us. Instructions for managing your
            consent preferences are available on our platform.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Contact Information
          </Typography>
          <Typography>
            If you have any questions about how we handle your data or wish to
            exercise your rights, please contact our Data Protection Officer at:
          </Typography>
          <Typography>
            Email:{" "}
            <Link href="mailto:info@curedclick.com">info@curedclick.com</Link>
          </Typography>
          <Typography>Phone: 07402 239242</Typography>

          <Typography variant="h4" gutterBottom>
            Updates to Privacy Practices
          </Typography>
          <Typography>
            We may update our data privacy practices periodically. Such changes
            will be communicated through our website and via email to registered
            users.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Full Privacy Policy
          </Typography>
          <Typography>
            For more detailed information about our data handling practices,
            please refer to our full privacy policy.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
