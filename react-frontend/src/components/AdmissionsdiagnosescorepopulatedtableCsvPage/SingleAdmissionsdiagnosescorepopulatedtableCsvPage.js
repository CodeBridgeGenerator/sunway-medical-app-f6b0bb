import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleAdmissionsdiagnosescorepopulatedtableCsvPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [patientid, setPatientid] = useState([]);
const [admissionid, setAdmissionid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("admissionsdiagnosescorepopulatedtableCsv")
            .get(urlParams.singleAdmissionsdiagnosescorepopulatedtableCsvId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"patientid","admissionid"] }})
            .then((res) => {
                set_entity(res || {});
                const patientid = Array.isArray(res.patientid)
            ? res.patientid.map((elem) => ({ _id: elem._id, patientid: elem.patientid }))
            : res.patientid
                ? [{ _id: res.patientid._id, patientid: res.patientid.patientid }]
                : [];
        setPatientid(patientid);
const admissionid = Array.isArray(res.admissionid)
            ? res.admissionid.map((elem) => ({ _id: elem._id, admissionid: elem.admissionid }))
            : res.admissionid
                ? [{ _id: res.admissionid._id, admissionid: res.admissionid.admissionid }]
                : [];
        setAdmissionid(admissionid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "AdmissionsdiagnosescorepopulatedtableCsv", type: "error", message: error.message || "Failed get admissionsdiagnosescorepopulatedtableCsv" });
            });
    }, [props,urlParams.singleAdmissionsdiagnosescorepopulatedtableCsvId]);


    const goBack = () => {
        navigate("/admissionsdiagnosescorepopulatedtableCsv");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Diagnoses</h3>
                </div>
                <p>admissionsdiagnosescorepopulatedtableCsv/{urlParams.singleAdmissionsdiagnosescorepopulatedtableCsvId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Primarydiagnosiscode</label><p className="m-0 ml-3" >{_entity?.primarydiagnosiscode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Primarydiagnosisdescription</label><p className="m-0 ml-3" >{_entity?.primarydiagnosisdescription}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Patientid</label>
                    {patientid.map((elem) => (
                        <Link key={elem._id} to={`/patientcorepopulatedtableCsv/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.patientid}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Admissionid</label>
                    {admissionid.map((elem) => (
                        <Link key={elem._id} to={`/admissionscorepopulatedtableCsv/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.admissionid}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleAdmissionsdiagnosescorepopulatedtableCsvPage);
