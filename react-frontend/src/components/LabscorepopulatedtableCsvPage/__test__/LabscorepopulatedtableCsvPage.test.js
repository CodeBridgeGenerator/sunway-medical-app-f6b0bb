import React from "react";
import { render, screen } from "@testing-library/react";

import LabscorepopulatedtableCsvPage from "../LabscorepopulatedtableCsvPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders labscorepopulatedtableCsv page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LabscorepopulatedtableCsvPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("labscorepopulatedtableCsv-datatable")).toBeInTheDocument();
    expect(screen.getByRole("labscorepopulatedtableCsv-add-button")).toBeInTheDocument();
});
