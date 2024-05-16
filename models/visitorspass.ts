interface Visitor {
  visitorId: number;
  barcode: string;
  indexId: number;
  passNumber: number;
  vDate: string;
  toMeet: string;
  department: string;
  noOfItems: string;
  allowedGates: string;
  validFor: string;
  authoByWhome: string;
  purpose: string;
  access: boolean;
  daysImage: string;
  passCancelledAt: string;
}

export const visitorsPassModel = (visitorObj: any = {}): Visitor => {
  return {
    visitorId: visitorObj?.visitorId ?? 0,
    barcode: visitorObj?.barcode ?? "",
    indexId: visitorObj?.indexId ?? 0,
    passNumber: visitorObj?.passNumber ?? 0,
    vDate: visitorObj?.vDate ?? "",
    toMeet: visitorObj?.toMeet ?? "",
    department: visitorObj?.department ?? "",
    noOfItems: visitorObj?.noOfItems ?? "",
    allowedGates: visitorObj?.allowedGates ?? "",
    validFor: visitorObj?.validFor ?? "",
    authoByWhome: visitorObj?.authoByWhome ?? "",
    purpose: visitorObj?.purpose ?? "",
    access: visitorObj?.access ?? false,
    daysImage: visitorObj?.daysImage ?? "",
    passCancelledAt: visitorObj?.passCancelledAt ?? "not cancelled",
  };
};
