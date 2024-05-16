import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../store";
import { cropFaces } from "../../store/camera/actions";
import Webcam from "react-webcam";
import {
  Modal,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCaptured: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ open, onClose, onCaptured }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const {
    application: {
      bearerToken,
      apiState: { status, isError, message },
      isLoginError,
    },
    cameraAnalysiss: { cameraAnalysisDetails, visitorFaceAnalysisDetails },
  } = useAppSelector((state: RootState) => state);

  const yourImageDataArray = cameraAnalysisDetails.cameraAnalysisArray;

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc);
    setIsConfirmDisabled(false);
  };

  const retake = () => {
    setImage(null);
    setIsConfirmDisabled(true);
  };

  const dispatch = useAppDispatch();

  const confirm = async () => {
    const imagetoSend = {
      base64Image: image?.replace(/^[^,]+,\s*/, ""),
    };
    const response = await dispatch(
      cropFaces(imagetoSend, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    // onClose();
    onCaptured();
  };

  const webcamRef = React.useRef<any>(null);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
        }}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "16px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Captured"
                  style={{
                    width: "200px",
                    height: "180px",
                    border: "2px solid #ddd",
                  }}
                />
              ) : (
                <Webcam
                  audio={false}
                  height={180}
                  width={200}
                  style={{
                    border: "3px solid #ddd",
                  }}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 220,
                    height: 200,
                    facingMode: "user",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!image ? (
                <Button variant="contained" onClick={capture}>
                  Capture
                </Button>
              ) : (
                <Button variant="outlined" onClick={retake}>
                  Retake
                </Button>
              )}
              <Button
                variant="contained"
                onClick={confirm}
                disabled={isConfirmDisabled || !image}
              >
                Confirm
              </Button>
              <Button color="error" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default CameraModal;
