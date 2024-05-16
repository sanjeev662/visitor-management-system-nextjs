import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { analyseVisitorFace } from "../../store/camera/actions";
import { startLoading } from "../../store/application/actions";
import { useAppDispatch, useAppSelector, RootState } from "../../store";
import Loading from "../Loading";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  Box,
  Grid,
  Typography
} from "@mui/material";

interface User {
  Image: string;
  name: string;
  mobileNumber: string;
}
interface Forms {
  name: string;
  mobile: string;
}

interface AnalysisResultData {
  similarty: string;
  visitorDetails: any;
}

interface ImageData {
  id: number;
  dataPoint: string;
}

const ImageGallery: React.FC<{
  images: ImageData[];
  onSelect: (index: number) => void;
}> = ({ images, onSelect }) => {
  if (images.length === 0) {
    return (
      <Box textAlign="center" p={2}>
        <Typography variant="h6">No images available. Please retake clear pictures.</Typography>
      </Box>
    );
  }
  return (
    <Box overflow="auto" p={2}>
      <Grid container spacing={2}>
        {images?.map((image, index) => (
          <Grid item key={image.id} xs={6} sm={3} md={3} lg={3} xl={3}>
            <Paper
              style={{
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => onSelect(index)}
            >
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5%",
                  border: "2px solid #fff",
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


interface FaceAnalysisProps {
  onNoMatch: () => void;
  onCloseFaceAnalysis: () => void;
  appointmentData?: any;
}

const FaceAnalysisModel: React.FC<FaceAnalysisProps> = ({ onNoMatch, onCloseFaceAnalysis, appointmentData }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState<Forms>({ name: appointmentData.fName || "", mobile: appointmentData.mobileNo || "" });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"imageSelection" | "formData" | "table">("imageSelection");
  const [title, setTitle] = useState("");
  const [dialogHeight, setDialogHeight] = useState<number>(400);
  const [dialogWidth, setDialogWidth] = useState<number>(600);


  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    application: {
      bearerToken,
      apiState: { status, isError, message },
      isLoginError,
      loaderState
    },
    cameraAnalysiss: { cameraAnalysisDetails, visitorFaceAnalysisDetails },
  } = useAppSelector((state: RootState) => state);

  const [analysisArray, setAnalysisArray] = useState(cameraAnalysisDetails.cameraAnalysisArray);
  const yourImageDataArray = cameraAnalysisDetails.cameraAnalysisArray;
  const visitorFaceAnalysisArray = visitorFaceAnalysisDetails.visitorFaceAnalysisArray;

  useEffect(() => {
    if (phase === "imageSelection") {
      setDialogHeight(350);
      setDialogWidth(500);
      setTitle("Please select a relevant image from the images");
    } else if (phase === "formData") {
      setDialogHeight(350);
      setDialogWidth(500);
      setTitle("Enter Valid Name And Mobile Number");
    } else if (phase === "table") {
      setDialogHeight(350);
      setDialogWidth(500);
      setTitle("Select From Below To Generate Pass");
    }
  }, [phase]);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    setPhase("formData");
  };

  const handleFormSubmit = () => {
    if (selectedImageIndex !== null && phase === "formData") {
      const obj: User = {
        Image: yourImageDataArray[selectedImageIndex].replace(/^[^,]+,\s*/, ""),
        mobileNumber: formData.mobile || "",
        name: formData.name || "",
      };

      var alphabetRegex = /^[A-Za-z\s]+$/;

      if (formData.name.trim() === '') {
        alert('Name cannot be blank');
        return;
      } else if (!alphabetRegex.test(formData.name.trim())) {
        alert('Name can only contain alphabets and spaces');
        return;
      }      

      var digitRegex = /^\d+$/;

      if (formData.mobile.trim() === '') {
        alert('Mobile number cannot be blank');
        return;
      } else if (!digitRegex.test(formData.mobile.trim())) {
        alert('Mobile number can only contain digits');
        return;
      } else if (formData.mobile.trim().length < 5) {
        alert('Mobile number should be at least 5 digits long');
        return;
      }

      dispatch(startLoading());
      dispatch(
        analyseVisitorFace(obj, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );

      setIsFormSubmitted(true);
      setPhase("table");
    } else {
      setOpen(false);
      onNoMatch();
    }
  };

  const handleBack = () => {
    if (phase === "formData") {
      setSelectedImageIndex(null);
      setPhase("imageSelection");
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  const handleGeneratePass = (visitor: AnalysisResultData) => {
    router.push({
      pathname: '/passes/generatepass',
      query: { datas: JSON.stringify(visitor.visitorDetails) },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth={true}
      PaperProps={{
        sx: {
          width: { dialogWidth },
          height: { dialogHeight }
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          height={dialogHeight}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {phase === "imageSelection" && (
            <ImageGallery
              images={yourImageDataArray}
              onSelect={handleImageSelect}
            />
          )}
          {phase === "formData" && selectedImageIndex != null && (
            <Box textAlign="center">
              <img
                src={`data:image/jpeg;base64,${yourImageDataArray[selectedImageIndex]}`}
                alt={`Selected Image`}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  margin: "20px",
                }}
              />
              <Box>
                <TextField
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ margin: "10px" }}
                  disabled={appointmentData?.fName !== undefined}
                />
                <TextField
                  label="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  style={{ margin: "10px" }}
                  disabled={appointmentData?.mobileNo !== undefined}
                />
              </Box>
            </Box>
          )}
          {isFormSubmitted && phase === "table" && (
            <>
              {loaderState ? (
                <Loading />
              ) : (
                <TableContainer
                  component={Paper}
                  style={{ maxHeight: "400px", overflow: "auto" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Photo</TableCell>
                        <TableCell>Mobile No</TableCell>
                        <TableCell>Similarity</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visitorFaceAnalysisArray?.length > 0 ? (
                        visitorFaceAnalysisArray?.map((visitor: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{visitor.visitorDetails.vFirstName}</TableCell>
                            <TableCell>
                              <Avatar
                                alt="User Photo"
                                src={`data:image/png;base64,${visitor.visitorDetails.vPhoto}`}
                                style={{ width: 70, height: 70 }} />
                            </TableCell>
                            <TableCell>{visitor.visitorDetails.vMobileNo}</TableCell>
                            <TableCell>{visitor.similarity}</TableCell>
                            <TableCell>
                              <Button variant="contained" color="primary" onClick={() => handleGeneratePass(visitor)}>
                                Generate Pass
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5}>No match found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {phase === "imageSelection" && (
          <Button variant="contained" color="primary" onClick={onCloseFaceAnalysis}>
            Retake
          </Button>
        )}
        {phase === "formData" && (
          <>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          </>
        )}
        {phase === "table" && (
          <>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={onCloseFaceAnalysis}>
              Retake
            </Button>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              Add Visitor
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FaceAnalysisModel;
