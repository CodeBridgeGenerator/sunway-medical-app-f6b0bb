import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const LabscorepopulatedtableCsvCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [patientid, setPatientid] = useState([])
const [admissionid, setAdmissionid] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount patientcorepopulatedtableCsv
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
                    //on mount admissionscorepopulatedtableCsv
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

    const onSave = async () => {
        let _data = {
            patientid: _entity?.patientid?._id,
admissionid: _entity?.admissionid?._id,
labname: _entity?.labname,
labvalue: _entity?.labvalue,
labunits: _entity?.labunits,
labdatetime: _entity?.labdatetime,
        };

        setLoading(true);
        try {
            
        await client.service("labscorepopulatedtableCsv").patch(_entity._id, _data);
        const eagerResult = await client
            .service("labscorepopulatedtableCsv")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "patientid",
                    service : "patientcorepopulatedtableCsv",
                    select:["patientid"]},{
                    path : "admissionid",
                    service : "admissionscorepopulatedtableCsv",
                    select:["admissionid"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info labscorepopulatedtableCsv updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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

    const patientidOptions = patientid.map((elem) => ({ name: elem.name, value: elem.value }));
const admissionidOptions = admissionid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Labs" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="labscorepopulatedtableCsv-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="patientid">Patientid:</label>
            <Dropdown id="patientid" value={_entity?.patientid?._id} optionLabel="name" optionValue="value" options={patientidOptions} onChange={(e) => setValByKey("patientid", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="admissionid">Admissionid:</label>
            <Dropdown id="admissionid" value={_entity?.admissionid?._id} optionLabel="name" optionValue="value" options={admissionidOptions} onChange={(e) => setValByKey("admissionid", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="labname">Labname:</label>
            <InputText id="labname" className="w-full mb-3 p-inputtext-sm" value={_entity?.labname} onChange={(e) => setValByKey("labname", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="labvalue">Labvalue:</label>
            <InputText id="labvalue" className="w-full mb-3 p-inputtext-sm" value={_entity?.labvalue} onChange={(e) => setValByKey("labvalue", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="labunits">Labunits:</label>
            <InputText id="labunits" className="w-full mb-3 p-inputtext-sm" value={_entity?.labunits} onChange={(e) => setValByKey("labunits", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="labdatetime">Labdatetime:</label>
            <Calendar id="labdatetime" value={_entity?.labdatetime ? new Date(_entity?.labdatetime) : new Date()} onChange={ (e) => setValByKey("labdatetime", new Date(e.target.value))} showIcon showButtonBar  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
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

export default connect(mapState, mapDispatch)(LabscorepopulatedtableCsvCreateDialogComponent);
