import React, { FC } from "react";
import { Box, useTheme, Theme } from "@mui/material";
import Header from "@/components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../src/theme";
import AppLayout from "@/components";

const Help: FC = () => {
  const theme: Theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <AppLayout>
      <Box m="20px">
        <Header title="HELP" subtitle="Frequently Asked Questions" />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How to Create an Appointment
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Click on the &quot;create appointment&quot; button from the sidebar or the dashboard, then fill in the details and click on the create button.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How to Add a new Visitor
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Click on the &quot;add new visitor&quot; button, then take or select a picture. If there are multiple pictures, fill in the details and finally submit after signature.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How to Generate a Pass
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can generate a pass directly from the visitor table by filling the details, or by choosing from the face recognition table.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How to Add an Employee
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              By clicking on the &quot;add employee&quot; button from the sidebar and filling in the details in the form.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              How Can We See Visitors/Passes/Appointments/Employees
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We can easily see all details listing from the sidebar.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </AppLayout>
  );
};

export default Help;
