import {Dayjs} from 'dayjs';

export const formatDayJs = (dayjsDate: Dayjs | null) => {
  if (!dayjsDate) {
    return '';
  }
  return dayjsDate.format('YYYY-MM-DD');
}
