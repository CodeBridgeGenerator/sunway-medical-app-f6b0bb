import React from "react";
import { render, screen } from "@testing-library/react";

import AdmissionsdiagnosescorepopulatedtableCsvEditDialogComponent from "../AdmissionsdiagnosescorepopulatedtableCsvEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders admissionsdiagnosescorepopulatedtableCsv edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AdmissionsdiagnosescorepopulatedtableCsvEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("admissionsdiagnosescorepopulatedtableCsv-edit-dialog-component")).toBeInTheDocument();
});
