import React from "react";
import { render, screen } from "@testing-library/react";

import LabscorepopulatedtableCsvCreateDialogComponent from "../LabscorepopulatedtableCsvCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders labscorepopulatedtableCsv create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LabscorepopulatedtableCsvCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("labscorepopulatedtableCsv-create-dialog-component")).toBeInTheDocument();
});
