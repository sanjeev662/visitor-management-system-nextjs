interface Camera {
  response_image: string[];
}

export const cameraModel = (userObj: any = {}): Camera => {
  return {
    response_image: userObj?.croppedImages ?? [],
  };
};


interface VisitorFaceAnalysis {
  similarity : string;
  visitorDetails : any;
}

export const visitorFaceAnalysisModel = (userObj: any = {}): VisitorFaceAnalysis => {
  return {
    similarity: userObj?.similarity ?? "",
    visitorDetails: userObj?.visitorDetails ?? {},
  };
};
