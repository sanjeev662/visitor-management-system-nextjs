interface Visitor {
  visitorId: number;
  indexId: number;
  vFirstName: string;
  vLastName: string;
  govID: string;
  vAddress: string;
  vMobileNo: string;
  visitorType: string;
  blacklisted: boolean;
  vSignature: string;
  vCommingDate: string;
  vTemplate: any | null;
  vSuspicious: any | null;
  Reason: string | null;
}

export const visitorsModel = (visitorObj: any = {}): Visitor => {
  return {
    visitorId: visitorObj?.visitorId ?? 0,
    indexId: visitorObj?.indexId ?? 0,
    vFirstName: visitorObj?.vFirstName ?? "",
    vLastName: visitorObj?.vLastName ?? "",
    govID: visitorObj?.govID ?? "",
    vAddress: visitorObj?.vAddress ?? "",
    vMobileNo: visitorObj?.vMobileNo ?? "",
    visitorType: visitorObj?.visitorType ?? "",
    blacklisted: visitorObj?.blacklisted ?? false,
    vSignature: visitorObj?.vSignature ?? "",
    vCommingDate: visitorObj?.vCommingDate ?? "",
    vTemplate: visitorObj?.vTemplate ?? null,
    vSuspicious: visitorObj?.vSuspicious ?? null,
    Reason: visitorObj?.Reason ?? null,
  };
};
