export const determinateWordHelper = (count: number, textForms: string[]): string => {
    count = Math.abs(count) % 100;
    const count1 = count % 10;
    if (count > 10 && count < 20) {
        return textForms[2];
    }
    if (count1 > 1 && count1 < 5) {
        return textForms[1];
    }
    if (count1 == 1) {
        return textForms[0];
    }
    return textForms[2];
};