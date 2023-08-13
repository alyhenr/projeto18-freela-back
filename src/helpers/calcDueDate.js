import dayjs from "dayjs";

export default (duration) => {
    return dayjs().add(duration, 'day');
};