import { parseISO, formatDistanceToNow } from "date-fns";
const getTimeAgo = (dateStr: string): string => {
  if (Boolean(dateStr)) {
    return formatDistanceToNow(parseISO(dateStr));
  }
  return "";
};

export default getTimeAgo;
