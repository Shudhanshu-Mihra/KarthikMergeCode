import { useAdminListTable } from "components/AdminListTable/AdminList.state"
import { useSelector } from "react-redux";
import { IState } from "services/redux/reducer";

export const useReAssignData = () => {

    const {
        settings: {
            adminUserData
        }
    } = useSelector((state: IState) => state);
    const firstAdminUser = adminUserData[0];
    return{
       id: firstAdminUser?.id,
       name: firstAdminUser?.name,
    }
}