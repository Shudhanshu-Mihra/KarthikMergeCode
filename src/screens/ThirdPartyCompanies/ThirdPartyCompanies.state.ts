import { useState, useEffect } from "react";
import { THIRD_PARTY_COMPANIES_INITIAL_STATE } from "./ThirdPartyCompanies.constants";
import {IS_ACTIVE} from 'constants/strings';
import { ActionMeta, SingleValue} from 'react-select';
import { Formik, useFormik } from "formik";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const[isConformRefreshOpen, setConformRefreshOpen] = useState(false);
  const[isRevokemodalBox, RevokemodalBox] = useState(false);
  const [createSuccessCompany, setCreateSuccessCompany] = useState<boolean>(false);
  const [visibleToken, setVisibleToken] = useState<string | null>(null);
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
    setIsModalOpen(true);
  };

  const handleRemoveToken = (companyName: string) => {
    handleConfirmDelete();
  };
  
  const handleRefreshToken = () => {
    handleConfirmRefresh()
  };

  const handleRevoke = (companyName: string) => {
    //
    handleConfirmRevoke();
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

  const handleConfirmRevoke = async () => {
    RevokemodalBox(true);
  };
  const handleCloseConfirmRevoke = () => {
    RevokemodalBox(false); 
    // setSelectedUser(null); 
  };
  
  const handleConfirmRefresh = async () => {
    setConformRefreshOpen(true);
  };
  const handleCloseConfirmRefresh = () => {
    setConformRefreshOpen(false); 
    // setSelectedUser(null); 
  };
  const handleViewToken = (token: string) => {
    setVisibleToken(token === visibleToken ? null : token); 
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token); 
    alert("Token copied to clipboard!");
  };
  const AddCompany = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
    },
    {
        type: 'select',
        label: 'Status',
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
    // Optionally perform actions when searchValue changes
  }, [searchValue]);

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
    isConformRefreshOpen,
    setConformRefreshOpen,
    handleCloseConfirmRefresh,
    handleConfirmRefresh,
    isRevokemodalBox,
    handleConfirmRevoke,
    handleCloseConfirmRevoke,
    handleCopyToken,
    handleViewToken,
    visibleToken,
    
  };
};
