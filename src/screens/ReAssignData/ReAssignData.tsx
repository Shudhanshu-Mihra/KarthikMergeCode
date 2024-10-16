import { FC } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ROUTES } from 'constants/routes'; 
import { CustomSelect } from 'components/CustomSelect';
import { useReAssignData } from './ReAssignData.state';
import { useAdminListTable } from 'components/AdminListTable/AdminList.state';


export const ReAssignData: FC = () => {
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate(ROUTES.usersList); 
  };

 const{name} = useReAssignData();

  return (
    <div>
      <h4 onClick={handleBackClick} style={{ cursor: 'pointer' }}>{"< Back"}</h4>
      <br />
      <h1>Re Assign data</h1>
      <h3>Name: {name}</h3>
    </div>
  );
};
