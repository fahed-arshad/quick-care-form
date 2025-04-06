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
              Privacy Policy for Cured Click Ltd
            </Typography>
            <Button onClick={handleClose} variant="outlined">
              <CloseIcon />
            </Button>
          </Box>
          <Divider />
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Introduction
          </Typography>
          <Typography>
            Welcome to Quick Care by Cured Click Ltd. We are dedicated to
            enhancing pharmacy operations and patient care through our
            innovative AI-driven tools. This Privacy Policy provides detailed
            information on how we collect, use, and protect your personal and
            health-related data.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Information Collection
          </Typography>
          <Typography>
            We collect information that you provide directly when you interact
            with Quick Care, including:
          </Typography>
          <List>
            <ListItem>
              Personal identifiers like your name, address, and date of birth.
            </ListItem>
            <ListItem>
              Contact details such as email address and phone number.
            </ListItem>
            <ListItem>
              Health information including symptoms, diagnosis, and medication
              history. We may also collect technical data from your interactions
              with our services.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Use of Information
          </Typography>
          <Typography>Your data is used to:</Typography>
          <List>
            <ListItem>Provide personalised healthcare services.</ListItem>
            <ListItem>Improve and optimise our tools and services.</ListItem>
            <ListItem>Communicate important updates or changes.</ListItem>
            <ListItem>
              Respond to inquiries or customer support requests.
            </ListItem>
          </List>
          <Typography>
            The legal basis for processing your data includes consent,
            contractual necessity, and our legitimate interests in providing
            effective services.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Data Sharing and Disclosure
          </Typography>
          <Typography>
            We share information with third parties only in the following
            circumstances:
          </Typography>
          <List>
            <ListItem>
              Service providers who assist us with operational tasks.
            </ListItem>
            <ListItem>
              If required by law or to protect our rights and the safety of
              others.
            </ListItem>
            <ListItem>
              With your consent, or as part of a business transaction such as a
              merger or acquisition.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Data Security
          </Typography>
          <Typography>
            We implement robust security measures to protect your data against
            unauthorised access, alteration, or destruction. These include
            encryption, access controls, and secure data storage solutions.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Data Retention
          </Typography>
          <Typography>
            We retain your personal information for as long as necessary to
            fulfil the purposes outlined in this policy, unless a longer
            retention period is required or permitted by law.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Your Rights
          </Typography>
          <Typography>You have the right to:</Typography>
          <List>
            <ListItem>Access, correct, or delete your personal data.</ListItem>
            <ListItem>
              Restrict or object to our processing of your data.
            </ListItem>
            <ListItem>
              Request deletion of your data where appropriate.
            </ListItem>
            <ListItem>
              Withdraw consent at any time, without affecting the lawfulness of
              processing based on consent before its withdrawal.
            </ListItem>
          </List>

          <Typography variant="h4" gutterBottom>
            Use of Cookies and Tracking Technologies
          </Typography>
          <Typography>
            We use cookies and similar tracking technologies to monitor
            interactions with our services and improve your user experience. You
            can control the use of cookies at the individual browser level.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Links to Other Websites
          </Typography>
          <Typography>
            Our services may contain links to other websites not operated by us.
            We are not responsible for the privacy practices of these websites.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Children&apos;s Privacy
          </Typography>
          <Typography>
            We do not knowingly collect or use information from children under
            the age of 16 without parental consent. If we become aware that we
            have collected such information, we will take steps to delete it.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Changes to the Privacy Policy
          </Typography>
          <Typography>
            We may update this policy from time to time. We will notify you of
            any changes by posting the new Privacy Policy on this page. We
            encourage you to review this Privacy Policy periodically for any
            changes.
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
          <Typography>Phone: 07492 669479</Typography>

          <Typography variant="h4" gutterBottom>
            Effective Date
          </Typography>
          <Typography>
            This Privacy Policy is effective as of 16/01/2025
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
