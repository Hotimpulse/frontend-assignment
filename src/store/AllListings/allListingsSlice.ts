import { IAdvertisment } from "@src/interfaces/IAdvertisment";

interface IAdvertisments {
  listings: IAdvertisment[];
  status: string;
}
const initialState: IAdvertisments = {
  listings: [],
  status: "", // 'loading', 'error', 'ready'
};
