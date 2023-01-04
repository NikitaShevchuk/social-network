export const useGetDayByNumber = (addedAt: string) => {
    const day = new Date(addedAt).getDay();
    switch (day) {
        case 0:
            return 'Mon';
        case 1:
            return 'Thu';
        case 2:
            return 'Wed';
        case 3:
            return 'Thur';
        case 4:
            return 'Fri';
        case 5:
            return 'Sut';
        case 6:
            return 'Sun';
        default:
            return 'Mon';
    }
};
