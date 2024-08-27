import React from "react";
import { render, screen } from "@testing-library/react";

import AdmissionscorepopulatedtableCsvPage from "../AdmissionscorepopulatedtableCsvPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders admissionscorepopulatedtableCsv page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AdmissionscorepopulatedtableCsvPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("admissionscorepopulatedtableCsv-datatable")).toBeInTheDocument();
    expect(screen.getByRole("admissionscorepopulatedtableCsv-add-button")).toBeInTheDocument();
});
