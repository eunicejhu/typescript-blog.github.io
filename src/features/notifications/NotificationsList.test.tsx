import React from "react";
import NotificationsList from "./NotificationsList";
import renderWithStore from "../../test/renderWithStore";
import Client from "../../api/client";
import { NOTIFICATIONS } from "../../test/mock_data";
jest.mock("../../api/client");

describe("NotificationsList test", () => {
  it("render correctly", async () => {
    Client.fetchAllNotifications = jest
      .fn()
      .mockResolvedValue({ data: NOTIFICATIONS });
    const { getByText, findAllByText, container } = renderWithStore(
      <NotificationsList />
    );
    expect(getByText(/Loading/i)).toBeInTheDocument();
    await findAllByText(/ /i); // technique to render after update
    expect(container.querySelectorAll("article").length).toBe(3);
  });
});
