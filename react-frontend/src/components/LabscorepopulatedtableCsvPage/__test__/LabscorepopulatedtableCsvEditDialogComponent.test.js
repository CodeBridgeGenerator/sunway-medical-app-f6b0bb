import React from "react";
import { render, screen } from "@testing-library/react";

import LabscorepopulatedtableCsvEditDialogComponent from "../LabscorepopulatedtableCsvEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders labscorepopulatedtableCsv edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LabscorepopulatedtableCsvEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("labscorepopulatedtableCsv-edit-dialog-component")).toBeInTheDocument();
});
