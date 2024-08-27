import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import AdmissionsdiagnosescorepopulatedtableCsvPage from "../AdmissionsdiagnosescorepopulatedtableCsvPage/AdmissionsdiagnosescorepopulatedtableCsvPage";
import LabscorepopulatedtableCsvPage from "../LabscorepopulatedtableCsvPage/LabscorepopulatedtableCsvPage";

const SingleAdmissionscorepopulatedtableCsvPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [patientid, setPatientid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("admissionscorepopulatedtableCsv")
            .get(urlParams.singleAdmissionscorepopulatedtableCsvId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"patientid"] }})
            .then((res) => {
                set_entity(res || {});
                const patientid = Array.isArray(res.patientid)
            ? res.patientid.map((elem) => ({ _id: elem._id, patientid: elem.patientid }))
            : res.patientid
                ? [{ _id: res.patientid._id, patientid: res.patientid.patientid }]
                : [];
        setPatientid(patientid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "AdmissionscorepopulatedtableCsv", type: "error", message: error.message || "Failed get admissionscorepopulatedtableCsv" });
            });
    }, [props,urlParams.singleAdmissionscorepopulatedtableCsvId]);


    const goBack = () => {
        navigate("/admissionscorepopulatedtableCsv");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Admissions</h3>
                </div>
                <p>admissionscorepopulatedtableCsv/{urlParams.singleAdmissionscorepopulatedtableCsvId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Admissionid</label><p className="m-0 ml-3" >{_entity?.admissionid}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Patientid</label>
                    {patientid.map((elem) => (
                        <Link key={elem._id} to={`/patientcorepopulatedtableCsv/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.patientid}</p>
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
        <AdmissionsdiagnosescorepopulatedtableCsvPage/>
<LabscorepopulatedtableCsvPage/>
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

export default connect(mapState, mapDispatch)(SingleAdmissionscorepopulatedtableCsvPage);
