import React from "react";
import { render, screen } from "@testing-library/react";

import PatientcorepopulatedtableCsvPage from "../PatientcorepopulatedtableCsvPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders patientcorepopulatedtableCsv page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PatientcorepopulatedtableCsvPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("patientcorepopulatedtableCsv-datatable")).toBeInTheDocument();
    expect(screen.getByRole("patientcorepopulatedtableCsv-add-button")).toBeInTheDocument();
});
