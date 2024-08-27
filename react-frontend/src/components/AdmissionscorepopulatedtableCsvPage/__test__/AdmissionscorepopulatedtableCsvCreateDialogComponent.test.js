import React from "react";
import { render, screen } from "@testing-library/react";

import AdmissionscorepopulatedtableCsvCreateDialogComponent from "../AdmissionscorepopulatedtableCsvCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders admissionscorepopulatedtableCsv create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AdmissionscorepopulatedtableCsvCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("admissionscorepopulatedtableCsv-create-dialog-component")).toBeInTheDocument();
});
