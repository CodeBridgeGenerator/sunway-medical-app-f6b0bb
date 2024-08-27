import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const PatientcorepopulatedtableCsvCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            patientid: _entity?.patientid,patientgender: _entity?.patientgender,patientdateofbirth: _entity?.patientdateofbirth,patientrace: _entity?.patientrace,patientmaritalstatus: _entity?.patientmaritalstatus,patientlanguage: _entity?.patientlanguage,patientpopulationpercentagebelowpoverty: _entity?.patientpopulationpercentagebelowpoverty,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("patientcorepopulatedtableCsv").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Patients created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Patients" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Patients" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="patientcorepopulatedtableCsv-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientid">Patientid:</label>
                <InputText id="patientid" className="w-full mb-3 p-inputtext-sm" value={_entity?.patientid} onChange={(e) => setValByKey("patientid", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientid"]) ? (
              <p className="m-0" key="error-patientid">
                {error["patientid"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientgender">Patientgender:</label>
                <InputText id="patientgender" className="w-full mb-3 p-inputtext-sm" value={_entity?.patientgender} onChange={(e) => setValByKey("patientgender", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientgender"]) ? (
              <p className="m-0" key="error-patientgender">
                {error["patientgender"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientdateofbirth">Patientdateofbirth:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientdateofbirth"]) ? (
              <p className="m-0" key="error-patientdateofbirth">
                {error["patientdateofbirth"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientrace">Patientrace:</label>
                <InputText id="patientrace" className="w-full mb-3 p-inputtext-sm" value={_entity?.patientrace} onChange={(e) => setValByKey("patientrace", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientrace"]) ? (
              <p className="m-0" key="error-patientrace">
                {error["patientrace"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientmaritalstatus">Patientmaritalstatus:</label>
                <InputText id="patientmaritalstatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.patientmaritalstatus} onChange={(e) => setValByKey("patientmaritalstatus", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientmaritalstatus"]) ? (
              <p className="m-0" key="error-patientmaritalstatus">
                {error["patientmaritalstatus"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientlanguage">Patientlanguage:</label>
                <InputText id="patientlanguage" className="w-full mb-3 p-inputtext-sm" value={_entity?.patientlanguage} onChange={(e) => setValByKey("patientlanguage", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientlanguage"]) ? (
              <p className="m-0" key="error-patientlanguage">
                {error["patientlanguage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientpopulationpercentagebelowpoverty">Patientpopulationpercentagebelowpoverty:</label>
                <InputText id="patientpopulationpercentagebelowpoverty" className="w-full mb-3 p-inputtext-sm" value={_entity?.patientpopulationpercentagebelowpoverty} onChange={(e) => setValByKey("patientpopulationpercentagebelowpoverty", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["patientpopulationpercentagebelowpoverty"]) ? (
              <p className="m-0" key="error-patientpopulationpercentagebelowpoverty">
                {error["patientpopulationpercentagebelowpoverty"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(PatientcorepopulatedtableCsvCreateDialogComponent);
