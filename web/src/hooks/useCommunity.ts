import { useSnackbar } from "notistack";
import { UserRes } from "../../../shared-types/userData";
import { getUsersListAction } from "../actions/user/user";

export const useCommunity = () => {
  const { enqueueSnackbar } = useSnackbar();

  const getCommunityList = async (): Promise<UserRes[]> => {
    try {
      const users = await getUsersListAction();
      return users;
    } catch (err) {
      enqueueSnackbar("Failed to fetch community list", { variant: "error" });
      return [];
    }
  };

  return { getCommunityList };
};

export default useCommunity;
