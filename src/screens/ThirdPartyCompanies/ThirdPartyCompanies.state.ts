import { useState, useEffect } from "react";
import { THIRD_PARTY_COMPANIES_INITIAL_STATE } from "./ThirdPartyCompanies.constants";
import {IS_ACTIVE} from 'constants/strings';
import { ActionMeta, SingleValue} from 'react-select';
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "services/redux/reducer";
import { getThirdPartyAllData } from "./ThirdPartyCompanies.api";
import { setThirdPartyCompanyData } from "./reducer/ThirdPartyCompanies.reducer";
interface Company {
  id: number;
  name: string;
}

interface State {
  searchValue: string;
  isContentLoading: boolean;
  isSearching: boolean;
}

interface IcreateCompany{
name: string;
status:boolean;
token:string;
webHook:string;
}
const initialState = THIRD_PARTY_COMPANIES_INITIAL_STATE;
export const useThirdPartyCompaniesState = () => {
const [state, setState] = useState<IcreateCompany>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalWindowOpen, setIsModalWindowOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countCompanies, setCountCompanies] = useState<number>(0);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [createSuccessCompany, setCreateSuccessCompany] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { 
    ThirdPartyCompanyData: { ThirdPartyCompanyAllData }
  } = useSelector((state: IState) => state);
  
  console.log("ThirdPartyCompanyAllData:- ",ThirdPartyCompanyAllData);

  const onModalWindowToggleHandler = () => {
    setIsModalWindowOpen(!isModalWindowOpen);
  };

  const onChangeSearchValueHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prevState: any) => ({
      ...prevState,
      searchValue: event.target.value,
      isContentLoading: true,
      isSearching: true,
    }));
  };

  const onEnterInsertCompany = async () => {
    // Handle API call or form submission logic
    setIsLoading(true);
    // Example: Fetch or process companies data
    setTimeout(() => {
      setFilteredCompanies([
        { id: 1, name: "Company A" },
        { id: 2, name: "Company B" },
      ]);
      setCountCompanies(2);
      setIsLoading(false);
    }, 1000);
  };

  const onChangeActiveValueHandler = (
    newValue: IoptionActive,
    actionMeta: ActionMeta<IoptionActive> | unknown
  ) => {
    console.log("newValue:",newValue.value)
  };
  const handleEditCompany = (companyName: string) => {
    setIsEdit(true);
  };

  const handleRemoveToken = (companyName: string) => {
    handleConfirmDelete();
  };
  
  const handleRefreshToken = (companyName: string) => {
    setIsEdit(true);
  };
  const handleRevoke = (companyName: string) => {
    
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyName('');
  };

  const handleSaveCompany = async () => {
    // await Formik.handleSubmit();
    handleCloseModal();
  };
  const formik = useFormik({
    initialValues: {
      name: selectedCompanyName,
      // add more initial values as needed
    },
    onSubmit: (values) => {
      console.log('Form Values:', values);
    },
  });

  const handleConfirmDelete = async () => {
    // setSelectedUser(user);
    // setUserNameAdmin(' ' + userName);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    // setSelectedUser(null); 
  };
  const AddCompany = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
    },
    {
        type: 'select',
        label: 'Active',
        name: 'active',
        isDisabled:false,
        options: IS_ACTIVE,
        onChangeSelect: onChangeActiveValueHandler,
    },
    {
      type: 'input',
      label: 'Webhook',
      name: 'name',
    },
    
  ];
  useEffect(() => {
   
  }, [searchValue]);

  //calling api to getting data

    const fetchThirdPartyCompaniesData  = async () => {
      console.log("test");
      const { data } = await getThirdPartyAllData();
      const DATA = data.data;
      dispatch(setThirdPartyCompanyData(DATA))
    }
  return {
    isLoading,
    isModalWindowOpen,
    searchValue,
    filteredCompanies,
    itemsPerPage,
    currentPage,
    countCompanies,
    createSuccessCompany,
    AddCompany,
    handleRevoke,
    handleCloseModal,
    handleSaveCompany,
    handleRefreshToken,
    handleRemoveToken,
    handleEditCompany,
    onChangeActiveValueHandler,
    onEnterInsertCompany,
    setIsEdit,
    setCreateSuccessCompany,
    onModalWindowToggleHandler,
    onChangeSearchValueHandler,
    handleConfirmDelete,
    isModalOpen,
    formik,
    setIsModalOpen,
    isEdit,
    selectedCompanyName,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    fetchThirdPartyCompaniesData,
    ThirdPartyCompanyAllData,
  };
};
