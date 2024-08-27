import React from "react";
import { render, screen } from "@testing-library/react";

import PatientcorepopulatedtableCsvCreateDialogComponent from "../PatientcorepopulatedtableCsvCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders patientcorepopulatedtableCsv create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PatientcorepopulatedtableCsvCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("patientcorepopulatedtableCsv-create-dialog-component")).toBeInTheDocument();
});
