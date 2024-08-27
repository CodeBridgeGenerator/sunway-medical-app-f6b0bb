import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const PatientcorepopulatedtableCsvDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.patientid}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.patientgender}</p>
const p_dateTemplate2 = (rowData, { rowIndex }) => <p >{(new Date(rowData.patientdateofbirth)).toLocaleDateString()}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.patientrace}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.patientmaritalstatus}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.patientlanguage}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.patientpopulationpercentagebelowpoverty}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!true}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "patientcorepopulatedtableCsv"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="patientid" header="Patientid" body={pTemplate0} filter={selectedFilterFields.includes("patientid")} hidden={selectedHideFields?.includes("patientid")}  sortable style={{ minWidth: "8rem" }} />
<Column field="patientgender" header="Patientgender" body={pTemplate1} filter={selectedFilterFields.includes("patientgender")} hidden={selectedHideFields?.includes("patientgender")}  sortable style={{ minWidth: "8rem" }} />
<Column field="patientdateofbirth" header="Patientdateofbirth" body={p_dateTemplate2} filter={selectedFilterFields.includes("patientdateofbirth")} hidden={selectedHideFields?.includes("patientdateofbirth")}  sortable style={{ minWidth: "8rem" }} />
<Column field="patientrace" header="Patientrace" body={pTemplate3} filter={selectedFilterFields.includes("patientrace")} hidden={selectedHideFields?.includes("patientrace")}  sortable style={{ minWidth: "8rem" }} />
<Column field="patientmaritalstatus" header="Patientmaritalstatus" body={pTemplate4} filter={selectedFilterFields.includes("patientmaritalstatus")} hidden={selectedHideFields?.includes("patientmaritalstatus")}  sortable style={{ minWidth: "8rem" }} />
<Column field="patientlanguage" header="Patientlanguage" body={pTemplate5} filter={selectedFilterFields.includes("patientlanguage")} hidden={selectedHideFields?.includes("patientlanguage")}  sortable style={{ minWidth: "8rem" }} />
<Column field="patientpopulationpercentagebelowpoverty" header="Patientpopulationpercentagebelowpoverty" body={pTemplate6} filter={selectedFilterFields.includes("patientpopulationpercentagebelowpoverty")} hidden={selectedHideFields?.includes("patientpopulationpercentagebelowpoverty")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
        <Dialog header="Upload PatientcorepopulatedtableCsv Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService />
      </Dialog>

      <Dialog header="Search PatientcorepopulatedtableCsv" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default PatientcorepopulatedtableCsvDataTable;