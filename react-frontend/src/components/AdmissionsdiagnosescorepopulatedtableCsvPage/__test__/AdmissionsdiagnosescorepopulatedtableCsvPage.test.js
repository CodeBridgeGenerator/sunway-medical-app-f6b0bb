import React from "react";
import { render, screen } from "@testing-library/react";

import AdmissionsdiagnosescorepopulatedtableCsvPage from "../AdmissionsdiagnosescorepopulatedtableCsvPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders admissionsdiagnosescorepopulatedtableCsv page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AdmissionsdiagnosescorepopulatedtableCsvPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("admissionsdiagnosescorepopulatedtableCsv-datatable")).toBeInTheDocument();
    expect(screen.getByRole("admissionsdiagnosescorepopulatedtableCsv-add-button")).toBeInTheDocument();
});
