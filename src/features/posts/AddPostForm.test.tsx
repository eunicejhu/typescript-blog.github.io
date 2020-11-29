import React from "react";
import { fireEvent, render } from "@testing-library/react";
// eslint-disable-next-line testing-library/no-dom-import
import { waitFor } from "@testing-library/dom";
import AddPostForm from "./AddPostForm";
import { Provider } from "react-redux";
import store from "../../store/index";

import { fetchUsers } from "../users/usersSlice";
import { makeServer } from "../../server";
import { Server, Response } from "miragejs";

let server: Server;
describe("AddPostForm test", () => {
    beforeAll(() => {
        console.error = jest.fn();
    });
    beforeEach(() => {
        server = makeServer();
        server.createList("user", 3);
        store.dispatch(fetchUsers());
    });
    afterEach(() => {
        server.shutdown();
    });

    it("type text in title and content input, select a user from the dropdown of users, click save post button to add a post", async () => {
        const { getByTestId, getByRole } = render(
            <Provider store={store}>
                <AddPostForm />
            </Provider>
        );

        await waitFor(() => {
            expect(store.getState().users.data.length).toBe(3);
        });

        const titleInput = getByTestId("title");
        const contentTextArea = getByTestId("content");
        const usersSelectOption = getByTestId("users").querySelector(
            "li.selectInput-li"
        ) as HTMLInputElement;
        const addPostButton = getByRole("button") as HTMLButtonElement;

        fireEvent.change(titleInput, { target: { value: "Title 3" } });
        fireEvent.change(contentTextArea, {
            target: { value: "Content 3" },
        });
        expect(addPostButton.disabled).toBeTruthy();

        fireEvent.click(usersSelectOption);
        expect(addPostButton.disabled).toBeFalsy();
        fireEvent.click(addPostButton);

        await waitFor(() => {
            expect(store.getState().posts.data.length).toBe(1);
            expect(store.getState().posts.data[0].title).toBe("Title 3");
            expect(store.getState().posts.data[0].date).not.toBeUndefined();
        });
    });

    it("show error message when failed to add new post", async () => {
        server.post("/posts", () => {
            return new Response(400);
        });
        const { getByTestId, getByRole, getByText } = render(
            <Provider store={store}>
                <AddPostForm />
            </Provider>
        );
        await waitFor(() => {
            expect(store.getState().users.data.length).toBe(3);
        });

        const titleInput = getByTestId("title");
        const contentTextArea = getByTestId("content");
        const usersSelect = getByTestId("users").querySelector(
            "input"
        ) as HTMLInputElement;
        const addPostButton = getByRole("button") as HTMLButtonElement;

        fireEvent.change(titleInput, { target: { value: "Title 1" } });
        fireEvent.change(contentTextArea, {
            target: { value: "Content 1" },
        });
        fireEvent.change(usersSelect, { target: { value: "1" } });
        fireEvent.click(addPostButton);

        await waitFor(() => {
            expect(getByText(/Failed to add new post/i)).toBeInTheDocument();
        });
    });
});
