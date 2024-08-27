import React from "react";
import { render, screen } from "@testing-library/react";

import PatientcorepopulatedtableCsvEditDialogComponent from "../PatientcorepopulatedtableCsvEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders patientcorepopulatedtableCsv edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PatientcorepopulatedtableCsvEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("patientcorepopulatedtableCsv-edit-dialog-component")).toBeInTheDocument();
});
