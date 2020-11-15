import { parseISO, formatDistanceToNow } from "date-fns";
const getTimeAgo = (dateStr: string | undefined): string => {
  if (typeof dateStr === "string") {
    return formatDistanceToNow(parseISO(dateStr));
  }
  return "";
};

export default getTimeAgo;
