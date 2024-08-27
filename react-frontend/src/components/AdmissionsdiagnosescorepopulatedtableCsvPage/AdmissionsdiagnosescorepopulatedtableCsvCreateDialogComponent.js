import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

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

const AdmissionsdiagnosescorepopulatedtableCsvCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [patientid, setPatientid] = useState([])
const [admissionid, setAdmissionid] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [patientid,admissionid], setError);
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
            patientid: _entity?.patientid?._id,admissionid: _entity?.admissionid?._id,primarydiagnosiscode: _entity?.primarydiagnosiscode,primarydiagnosisdescription: _entity?.primarydiagnosisdescription,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("admissionsdiagnosescorepopulatedtableCsv").create(_data);
        const eagerResult = await client
            .service("admissionsdiagnosescorepopulatedtableCsv")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "patientid",
                    service : "patientcorepopulatedtableCsv",
                    select:["patientid"]},{
                    path : "admissionid",
                    service : "admissionscorepopulatedtableCsv",
                    select:["admissionid"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Diagnoses updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Diagnoses" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount patientcorepopulatedtableCsv
                    client
                        .service("patientcorepopulatedtableCsv")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePatientcorepopulatedtableCsvId } })
                        .then((res) => {
                            setPatientid(res.data.map((e) => { return { name: e['patientid'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PatientcorepopulatedtableCsv", type: "error", message: error.message || "Failed get patientcorepopulatedtableCsv" });
                        });
                }, []);

useEffect(() => {
                    // on mount admissionscorepopulatedtableCsv
                    client
                        .service("admissionscorepopulatedtableCsv")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleAdmissionscorepopulatedtableCsvId } })
                        .then((res) => {
                            setAdmissionid(res.data.map((e) => { return { name: e['admissionid'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "AdmissionscorepopulatedtableCsv", type: "error", message: error.message || "Failed get admissionscorepopulatedtableCsv" });
                        });
                }, []);

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

    const patientidOptions = patientid.map((elem) => ({ name: elem.name, value: elem.value }));
const admissionidOptions = admissionid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Diagnoses" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="admissionsdiagnosescorepopulatedtableCsv-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="patientid">Patientid:</label>
                <Dropdown id="patientid" value={_entity?.patientid?._id} optionLabel="name" optionValue="value" options={patientidOptions} onChange={(e) => setValByKey("patientid", {_id : e.value})}  />
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
                <label htmlFor="admissionid">Admissionid:</label>
                <Dropdown id="admissionid" value={_entity?.admissionid?._id} optionLabel="name" optionValue="value" options={admissionidOptions} onChange={(e) => setValByKey("admissionid", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["admissionid"]) ? (
              <p className="m-0" key="error-admissionid">
                {error["admissionid"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="primarydiagnosiscode">Primarydiagnosiscode:</label>
                <InputText id="primarydiagnosiscode" className="w-full mb-3 p-inputtext-sm" value={_entity?.primarydiagnosiscode} onChange={(e) => setValByKey("primarydiagnosiscode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["primarydiagnosiscode"]) ? (
              <p className="m-0" key="error-primarydiagnosiscode">
                {error["primarydiagnosiscode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="primarydiagnosisdescription">Primarydiagnosisdescription:</label>
                <InputTextarea id="primarydiagnosisdescription" rows={5} cols={30} value={_entity?.primarydiagnosisdescription} onChange={ (e) => setValByKey("primarydiagnosisdescription", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["primarydiagnosisdescription"]) ? (
              <p className="m-0" key="error-primarydiagnosisdescription">
                {error["primarydiagnosisdescription"]}
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

export default connect(mapState, mapDispatch)(AdmissionsdiagnosescorepopulatedtableCsvCreateDialogComponent);
