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
// const [state, setState] = useState<IcreateCompany>(initialState);
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
  const [isEditCompany, setIsEditCompany] = useState<boolean>(false);
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

  // console.log("SelectedThirdPartyCompanyData:- ",SelectedThirdPartyCompanyData);
  // console.log("ThirdPartyCompanyAllData:- ",ThirdPartyCompanyAllData);

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
    console.log("status:", newValue.label,)

    setCompanyData((prevData) => ({
      ...prevData, 
      active: newValue.value
    }));
  };

  const handleEditCompany = async (companyID: string ,Company_Name:string) => {
    setIsLoading(true)
    // setIsEdit(true);
    const { data } = await getSelectedThirdPartyData(companyID)
    console.log("getSelectedThirdPartyData :-", data);
    dispatch(setSelectedThirdPartyCompanyData(data))
    setState(prevData => ({
      ...prevData,
      companyName:Company_Name // Merging the new data with the previous data
    }));
    setIsLoading(false);
    setIsEditCompany(true);
    // setIsModalOpen(true);


  };

  const handleRemoveToken = (companyName: string) => {
    handleConfirmDelete();
  };
  
  const handleRefreshToken = async(Id: string) => {
    const { data } = await  getSelectedThirdPartyData(Id)
    // console.log("getSelectedThirdPartyData :-", data);
  dispatch(setSelectedThirdPartyCompanyData(data))
    handleConfirmRefresh()
  };

  const handleRevoke = async(id: string) => {
    const { data } = await  getSelectedThirdPartyData(id)
    // console.log("getSelectedThirdPartyData :-", data);
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
      companyWebHook: '',
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
          active: state.companyStatus || null,
          tpc_wh: state.companyWebHook || '' 
        }
      const { data } =  await updateThirdPartyCompany(payload);
      dispatch(setSelectedThirdPartyCompanyData(data))
    },
  });
  
  const formikAddCompany = useFormik({
    enableReinitialize: true, 
    initialValues: {
 
      companyName: '' , // Initialize with the default values if necessary
      companyWebHook: '',
      // companyStatus: companyData.active || false || null 
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Company name is required'),
      companyWebHook: Yup.string().required('Company WebHook is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
        const payload = {
          name: values.companyName || '',
          active: companyData.active || null,
          tpc_wh: values.companyWebHook || '' // Corrected the property here
        }
        console.log(payload);
        createThirdPartyCompany(payload);
      fetchThirdPartyCompaniesData();
    },
  });
// console.log(companyData)
  const handleConfirmDelete = async () => {
    // setSelectedUser(user);
    // setUserNameAdmin(' ' + userName);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    // setSelectedUser(null); 
  };

  const handleConfirmDeleteYes = async () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmRevoke = async () => {
    RevokemodalBox(true);
    // console.log("isRevokemodalBox", isRevokemodalBox);
    // return
  };
  const handleCloseConfirmRevoke = () => {
    RevokemodalBox(false); 
    // setSelectedUser(null); 
  };
  const handleYesConfirmRevoke = async () => {
    const response = await getThirdPartyRevoke(SelectedThirdPartyCompanyData.id||state.companyId);
    // console.log("response :- ", response.data);
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
  };
  const handleCloseConfirmRefresh = () => {
    setConformRefreshOpen(false); 
    // setSelectedUser(null); 
  };
  const handleConfirmRefreshYes = async () => {

    const response = await getThirdPartyRefreshToken(SelectedThirdPartyCompanyData.id||state.companyId);
    // console.log("response :- ", response.data);
    dispatch(setSelectedThirdPartyCompanyData(response.data))   
    setConformRefreshOpen(false);
  };
  const AddCompany = [
    {
      type: 'input',
      label: 'Name',
      // name: 'name',
      name: 'companyName',
      // value: SelectedThirdPartyCompanyData.name || state.companyName || 'test'
    },
    {
        type: 'select',
        label: 'Status',
        // name: 'active',
        name: 'companyStatus',
        isDisabled:false,
        options: IS_ACTIVE,
      onChangeSelect: onChangeActiveValueHandler,
        // value:SelectedThirdPartyCompanyData.active ||state.companyStatus || "Inactive"
    },
    {
      type: 'input',
      label: 'Webhook',
      // name: 'webhook',
      name: 'companyWebHook',
      // value:SelectedThirdPartyCompanyData.tpc_wh ||state.companyWebHook || 'http://test.com'
    },
    
  ];
  const EditCompany = [
    {
      type: 'input',
      label: 'Name',
      // name: 'name',
      name: 'companyName',
      // value: SelectedThirdPartyCompanyData.name || state.companyName || 'test'
    },]

  const handleViewToken = (token: string) => {
    setVisibleToken(token === visibleToken ? null : token); 
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token); 
    alert("Token copied to clipboard!");
  };
  // const AddCompany = [
  //   {
  //     type: 'input',
  //     label: 'Name',
  //     name: 'companyName',
  //     value: SelectedThirdPartyCompanyData.name || state.companyName,
  //     onChange: formik.handleChange,
  //     onBlur: formik.handleBlur, // You may want to include this if using Formik's validation
  //     formikProps: formik.getFieldProps('companyName'),
  //     formikMeta: formik.getFieldMeta('companyName'),
  //   },
  //   {
  //     type: 'select',
  //     label: 'Status',
  //     name: 'companyStatus',
  //     isDisabled: false,
  //     options: IS_ACTIVE,
  //     onChangeSelect: onChangeActiveValueHandler,
  //     value:SelectedThirdPartyCompanyData.active ||state.companyStatus
  //   ,
  //     formikProps: formik.getFieldProps('companyStatus'),
  //     formikMeta: formik.getFieldMeta('companyStatus'),
  //   },
  //   {
  //     type: 'input',
  //     label: 'Webhook',
  //     name: 'companyWebHook',
  //     value: SelectedThirdPartyCompanyData.tpc_wh || state.companyWebHook,
  //     onChange: formik.handleChange,
  //     onBlur: formik.handleBlur,
  //     formikProps: formik.getFieldProps('companyWebHook'),
  //     formikMeta: formik.getFieldMeta('companyWebHook'),
  //   },
  // ];
  
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
    itemsPerPage,
    currentPage,
    countCompanies,
    createSuccessCompany,
    AddCompany,
    handleRevoke,
    handleCloseModal,
    handleEditSaveCompany,
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
    handleAddSaveCompany
  };
};
