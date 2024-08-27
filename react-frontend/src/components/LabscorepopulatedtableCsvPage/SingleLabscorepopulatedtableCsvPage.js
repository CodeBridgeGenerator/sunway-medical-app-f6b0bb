import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleLabscorepopulatedtableCsvPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [patientid, setPatientid] = useState([]);
const [admissionid, setAdmissionid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("labscorepopulatedtableCsv")
            .get(urlParams.singleLabscorepopulatedtableCsvId, { query: { $populate: [            {
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
                props.alert({ title: "LabscorepopulatedtableCsv", type: "error", message: error.message || "Failed get labscorepopulatedtableCsv" });
            });
    }, [props,urlParams.singleLabscorepopulatedtableCsvId]);


    const goBack = () => {
        navigate("/labscorepopulatedtableCsv");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Labs</h3>
                </div>
                <p>labscorepopulatedtableCsv/{urlParams.singleLabscorepopulatedtableCsvId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Labname</label><p className="m-0 ml-3" >{_entity?.labname}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Labvalue</label><p className="m-0 ml-3" >{_entity?.labvalue}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Labunits</label><p className="m-0 ml-3" >{_entity?.labunits}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Labdatetime</label><p id="labdatetime" className="m-0 ml-3" >{_entity?.labdatetime}</p></div>
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

export default connect(mapState, mapDispatch)(SingleLabscorepopulatedtableCsvPage);
