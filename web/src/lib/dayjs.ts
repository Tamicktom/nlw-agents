//* Libraries imports
import dayjsLib from "dayjs";
import "dayjs/locale/pt";
import relativeTime from "dayjs/plugin/relativeTime";

dayjsLib.locale("pt");
dayjsLib.extend(relativeTime);

export const dayjs = dayjsLib;
