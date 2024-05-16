export interface VisitorsByImage {
    name: string;
    picture: string;
  }
  
export const visitorsByImageModel = (data: any): VisitorsByImage[] => {
    if (!data || !data.images) {
      return [];
    }
  
    const visitorsByImageArray: VisitorsByImage[] = [];
  
    for (const key in data.images) {
      if (data.images.hasOwnProperty(key)) {
        const visitorsByImage: VisitorsByImage = {
          name: key,
          picture: data.images[key],
        };
        visitorsByImageArray.push(visitorsByImage);
      }
    }
  
    return visitorsByImageArray;
};
  