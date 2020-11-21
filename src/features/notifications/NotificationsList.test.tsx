import React from "react";
import { Provider } from "react-redux";
import NotificationsList from "./NotificationsList";
import { render } from "@testing-library/react";
import Client from "../../api/client";
import { NOTIFICATIONS } from "../../test/mock_data";
import store from "../../store/index";
import { fetchUsers } from "../users/usersSlice";
jest.mock("../../api/client");

describe("NotificationsList test", () => {
  beforeAll(() => {
    store.dispatch(fetchUsers());
  });
  it.only("render correctly", async () => {
    Client.fetchAllNotifications = jest
      .fn()
      .mockResolvedValue({ data: NOTIFICATIONS });
    const { getByText, findAllByText, container } = render(
      <Provider store={store}>
        <NotificationsList />
      </Provider>
    );
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await findAllByText(/ /i); // technique to render after update
    expect(container.querySelectorAll("article").length).toBe(3);
  });
});
