export function getMetricsForWidth(string: string, width: number, fontWeight: string = "", font: string) {
    const tolerance = 0.05;
    let diff = Infinity;
    let maxPt = 1000;
    let minPt = 0;
    let fontPt : number;
    let iter = 0;
    let marginLeft : number;

    while (Math.abs(diff) > tolerance && iter < 100) {
        fontPt = (maxPt + minPt) / 2;
        const { width: fontWidth, actualBoundingBoxLeft } = getAdvancedTextMetrics(
          string,
          `${fontWeight} ${fontPt}px ${font}`,
        );
        if (actualBoundingBoxLeft !== null && fontWidth !== null) {
            marginLeft = actualBoundingBoxLeft;
            diff = width - fontWidth;
            if (width > fontWidth) {
                minPt = fontPt;
            } else {
                maxPt = fontPt;
            }
        }
        iter = iter + 1;
      }

}


export const getAdvancedTextMetrics = (text: string, font: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) {
        return {
            width: null,
            actualBoundingBoxLeft: null,
        };
    }
    context.font = font;
    const metrics = context.measureText(text);
    return {
      width: metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft,
      actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
    };
  };
