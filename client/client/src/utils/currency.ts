export const formatPrice = (price: number): string => {
    // Assuming base price was in GBP, converting to INR roughly (x105)
    // or just treating the number as is if we update data. 
    // Let's assume we multiply by 105 for realism.
    const inrPrice = price * 105;

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(inrPrice);
};
