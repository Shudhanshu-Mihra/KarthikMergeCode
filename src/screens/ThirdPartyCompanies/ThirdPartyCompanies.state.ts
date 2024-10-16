import { useState, useEffect } from "react";
import { THIRD_PARTY_COMPANIES_INITIAL_STATE } from "./ThirdPartyCompanies.constants";
import {IS_ACTIVE} from 'constants/strings';
import { ActionMeta, SingleValue} from 'react-select';
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "services/redux/reducer";
import { createThirdPartyCompany, getSelectedThirdPartyData, getThirdPartyAllData, getThirdPartyRefreshToken, getThirdPartyRevoke, updateThirdPartyCompany } from "./ThirdPartyCompanies.api";
import { setSelectedThirdPartyCompanyData, setThirdPartyCompanyData } from "./reducer/ThirdPartyCompanies.reducer";
import { ITHIRD_PARTY_COMPANY_DATA_INITIAL_STATE } from "./type/ThirdPartyCompanies.type";
import * as Yup from 'yup';
import { selectOptions } from "@testing-library/user-event/dist/types/setup/directApi";

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
// const initialState = THIRD_PARTY_COMPANIES_INITIAL_STATE;
export const useThirdPartyCompaniesState = () => {
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalWindowOpen, setIsModalWindowOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [countCompanies, setCountCompanies] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const[isConformRefreshOpen, setConformRefreshOpen] = useState(false);
  const[isRevokemodalBox, RevokemodalBox] = useState(false);
  const [createSuccessCompany, setCreateSuccessCompany] = useState<boolean>(false);
  const [isEditCompany, setIsEditCompany] = useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);
  const [isCreateCompany, setIsCreateCompany] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState({
    id: "",
    created: "",
    name: "",
    logo: null,
    date_format: "",
    active: false ,
    tpc: false,
    tpc_token: "",
    tpc_wh: "",
    autoscan_email: ""
  });
  const [isChangeActiveValueHandlerAddCompany, setIsChangeActiveValueHandlerAddCompany] = useState<boolean>(true);

  // ChangeActiveValueHandlerAddCompany

  const dispatch = useDispatch();

  const { 
    ThirdPartyCompanyData: { ThirdPartyCompanyAllData  ,SelectedThirdPartyCompanyData}
  } = useSelector((state: IState) => state);
  
  const [state, setState] = useState({
    companyName: SelectedThirdPartyCompanyData?.name || "",
    companyId: SelectedThirdPartyCompanyData?.id || "",
    companyToken: SelectedThirdPartyCompanyData?.tpc_token || "",
    companyWebHook: SelectedThirdPartyCompanyData?.tpc_wh || "",
    companyStatus: SelectedThirdPartyCompanyData?.active || null ,
    name: '',
    status: false,
    token: '',
    webHook: '',
  });
  
  useEffect(() => {
    setState((prevState) => ({
      ...prevState, // Ensure other state properties are not overwritten
      companyName:  SelectedThirdPartyCompanyData?.name || '',
      companyId:SelectedThirdPartyCompanyData?.id || '',
      companyToken: SelectedThirdPartyCompanyData?.tpc_token || '',
      companyWebHook:SelectedThirdPartyCompanyData?.tpc_wh || '',
      companyStatus: SelectedThirdPartyCompanyData?.active || null,
      
    }));
  }, [SelectedThirdPartyCompanyData ,ThirdPartyCompanyAllData]);

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

  const [webhookVisibility, setWebhookVisibility] = useState<boolean[]>([]);
  useEffect(() => {
    setWebhookVisibility(Array(ThirdPartyCompanyAllData.length).fill(false));
  }, [ThirdPartyCompanyAllData]);

  const toggleWebhookVisibility = (index: number) => {
    setWebhookVisibility((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index]; 
      return newVisibility;
    });
  };

  const onEnterInsertCompany = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredCompanies([
        { id: 1, name: "Company A" },
        { id: 2, name: "Company B" },
      ]);
      setCountCompanies(2);
      setIsLoading(false);
    }, 1000);
  };

  const onChangeActiveValueHandlerAddCompany = (
    newValue: IoptionActive,
    actionMeta: ActionMeta<IoptionActive> | unknown
  ) => {
    console.log("status:", newValue.value,)

    setIsChangeActiveValueHandlerAddCompany(newValue.value);
  };
  const onChangeActiveValueHandlerEditCompany = (
    newValue: IoptionActive,
    actionMeta: ActionMeta<IoptionActive> | unknown
  ) => {
    console.log("status:", newValue.value,)

    setCompanyData((prevData) => ({
      ...prevData, 
      active: newValue.value
    }));
  };
  
  console.log("companyData :- ",companyData);
  const handleEditCompany = async (companyID: string ,Company_Name:string) => {
    setIsLoading(true)
    // setIsEdit(true);
    const { data } = await getSelectedThirdPartyData(companyID)
    console.log("getSelectedThirdPartyData :-", data);
    dispatch(setSelectedThirdPartyCompanyData(data))
    setState(prevData => ({
      ...prevData,
      companyName:Company_Name 
    }));
    setCompanyData(data)
    setIsLoading(false);
    setIsEditCompany(true);
    // setIsModalOpen(true);


  };

  const handleRemoveToken = (companyName: string) => {
    handleConfirmDelete();
  };
  
  const handleRefreshToken = async(Id: string) => {
    const { data } = await  getSelectedThirdPartyData(Id)
  dispatch(setSelectedThirdPartyCompanyData(data))
    handleConfirmRefresh()
  };

  const handleRevoke = async(id: string) => {
    const { data } = await  getSelectedThirdPartyData(id)
  dispatch(setSelectedThirdPartyCompanyData(data))
    handleConfirmRevoke();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditCompany(false);
    // setSelectedCompanyName('');
  };

  const handleEditSaveCompany = async () => {
    await formikEditCompany.handleSubmit();
    handleCloseModal();
  };
  const handleAddSaveCompany = async () => {
    await formikAddCompany.handleSubmit();
    handleCloseModal();
  };

  console.log("company NAme",state.companyName);

  const formikEditCompany = useFormik({
    enableReinitialize: true, 
    initialValues: {
 
      companyName:state?.companyName || '' , // Initialize with the default values if necessary
      companyWebHook: state?.companyWebHook || '',
      // companyStatus: companyData.active || false || null 
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Company name is required'),
    }),
    onSubmit: async (values) => {
      console.log('Form EDIT :- ', values);
      const payload = {
          id:state.companyId,
          name: values.companyName || '',
          active: companyData.active|| false,
          tpc_wh: values.companyWebHook || '' 
        }
      const { data } =  await updateThirdPartyCompany(payload);
      dispatch(setSelectedThirdPartyCompanyData(data))
    },
  });
  
  const formikAddCompany = useFormik({
    enableReinitialize: true, 
    initialValues: {
 
      companyName: '' , 
      companyWebHook: '',
   
    },
    // validationSchema: Yup.object({
    //   companyName: Yup.string().required('Company name is required'),
    //   companyWebHook: Yup.string()
    //     .matches(/^(http:\/\/|https:\/\/)[^A-Z]*$/, 'Must start with http:// or https://, and capital letters are not allowed')
    //     .required('Company WebHook is required'),
    // }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          name: values.companyName || '',
          active: companyData.active,
          tpc_wh: values.companyWebHook || ''
        }
        const response = await createThirdPartyCompany(payload);
        if (response.status === 200) {
          setIsSuccessPopupOpen(true);
          setIsCreateCompany(true);
          await fetchThirdPartyCompaniesData();
          resetForm();
        }
      }
    catch (error) {
      setIsSuccessPopupOpen(true);
        console.error("Error occurred while creating third-party company:", error);
        setIsCreateCompany(false)
    }
    },
  });
  const handleConfirmDelete = async () => { 
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
  };

  const handleConfirmDeleteYes = async () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmRevoke = async () => {
    RevokemodalBox(true);
  };
  const handleCloseConfirmRevoke = () => {
    RevokemodalBox(false); 
  };
  const handleYesConfirmRevoke = async () => {
    const response = await getThirdPartyRevoke(SelectedThirdPartyCompanyData.id||state.companyId);
  dispatch(setSelectedThirdPartyCompanyData(response.data))
    
    RevokemodalBox(false);
    return new Promise((resolve, reject) => {
        if (response.status === 200) {
          resolve(200);
        } else {
          reject(400);
        }
      });
  };

  const handleConfirmRefresh = async () => {
    setConformRefreshOpen(true);
    //call popup 
  };
  const handleCloseConfirmRefresh = () => {
    setConformRefreshOpen(false); 
  };
  const handleConfirmRefreshYes = async () => {
    const response = await getThirdPartyRefreshToken(SelectedThirdPartyCompanyData.id||state.companyId);
    dispatch(setSelectedThirdPartyCompanyData(response.data))   
    setConformRefreshOpen(false);
  };
  const selectedStatusOfThirdPartyAddCompany = isChangeActiveValueHandlerAddCompany
  ? { label: "Active", value: true }
    : { label: "Inactive", value: false }; 
  
  const AddCompany = [
    {
      type: 'input',
      label: 'Name',
      name: 'companyName',
    },
    {
        type: 'select',
        label: 'Status',
        name: 'companyStatus',
        isDisabled:false,
      options: IS_ACTIVE,
      // value: IS_ACTIVE[0],
      value: selectedStatusOfThirdPartyAddCompany,
      // selectOptions:IS_ACTIVE[0],
      onChangeSelect: onChangeActiveValueHandlerAddCompany,
    },
    {
      type: 'input',
      label: 'Webhook',
      name: 'companyWebHook',
    }
  ];
 
  const selectedStatusOfThirdPartyCompany = companyData.active
  ? { label: "Active", value: true }
    : { label: "Inactive", value: false }; 
  const EditCompany = [
    {
      type: 'input',
      label: 'Name',
      name: 'companyName',
    },
    {
      type: 'select',
      label: 'Status',
      name: 'companyStatus',
      isDisabled: false,
      selectValue: state?.status,
      value:selectedStatusOfThirdPartyCompany ,
      options: IS_ACTIVE,
    onChangeSelect: onChangeActiveValueHandlerEditCompany,
  },
  {
    type: 'input',
    label: 'Webhook',
    name: 'companyWebHook',
  }]

  const handleViewToken = (token: string) => {
    setVisibleToken(token === visibleToken ? null : token); 
  };
 
  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token); 
    setCopied(true)
    setTimeout(() => setCopied(false), 1000);
  };
  const handleCopyWebHook = (webHook: string) => {
    navigator.clipboard.writeText(webHook); 
    setCopied(true)
    setTimeout(() => setCopied(false), 1000);
  };

  
  // useEffect(() => {
   
  // }, [searchValue]);

  //calling api to getting data
  // console.log(formik);
    const fetchThirdPartyCompaniesData  = async () => {
      // console.log("test"); 
      const { data } = await getThirdPartyAllData();
      const DATA = data.data;
      dispatch(setThirdPartyCompanyData(DATA))
    }
  return {
    state,
    isLoading,
    isModalWindowOpen,
    searchValue,
    filteredCompanies,
    // itemsPerPage,
    // currentPage,
    countCompanies,
    createSuccessCompany,
    AddCompany,
    handleRevoke,
    handleCloseModal,
    handleEditSaveCompany,
    handleRefreshToken,
    handleRemoveToken,
    handleEditCompany,
    onEnterInsertCompany,
    setIsEdit,
    setCreateSuccessCompany,
    onModalWindowToggleHandler,
    onChangeSearchValueHandler,
    handleConfirmDelete,
    isModalOpen,
    formikEditCompany,
    setIsModalOpen,
    isEdit,
    selectedCompanyName,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    fetchThirdPartyCompaniesData,
    ThirdPartyCompanyAllData,
    isConformRefreshOpen,
    setConformRefreshOpen,
    handleCloseConfirmRefresh,
    handleConfirmRefresh,
    handleConfirmRefreshYes,
    isRevokemodalBox,
    handleConfirmRevoke,
    handleYesConfirmRevoke,
    handleCloseConfirmRevoke,
    handleCopyToken,
    handleViewToken,
    visibleToken,
    EditCompany,
    isEditCompany,
    formikAddCompany,
    handleAddSaveCompany,
    handleCopyWebHook,
    webhookVisibility,
    toggleWebhookVisibility,
    setSelectedCompanyName,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    isCreateCompany,
    copied
  };
};
