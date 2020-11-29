import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";

import { themes } from "./context/ThemeContext";

it("render correctly", () => {
    const ui = (
        <Provider store={store}>
            <BrowserRouter>
                <App themes={themes} mode={"pink"} />
            </BrowserRouter>
        </Provider>
    );
    const { container } = render(ui);
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          class="sc-hKgILt bgujip"
          mode="pink"
        >
          <header>
            <nav>
              <li>
                <a
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/notifications"
                >
                  Notifications
                </a>
              </li>
            </nav>
            <div
              class="selectWrapper"
            >
              <div
                class="sc-gsTCUz hrxIhJ"
                mode="pink"
              >
                <input
                  class="selectInput"
                  data-testid="selectInput"
                  placeholder="theme"
                  type="text"
                  value="pink"
                />
                <ul
                  class="close"
                >
                  <li
                    class="selectInput-li"
                    data-id="dark"
                    data-name="dark"
                    data-testid="dark"
                  >
                    dark
                  </li>
                  <li
                    class="selectInput-li"
                    data-id="pink"
                    data-name="pink"
                    data-testid="pink"
                  >
                    pink
                  </li>
                  <li
                    class="selectInput-li"
                    data-id="light"
                    data-name="light"
                    data-testid="light"
                  >
                    light
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <main>
            <section
              class="add-post-form"
            >
              <form
                class="sc-dlfnbm iJLUVS"
              >
                <div
                  class="field"
                >
                  <label
                    for="title"
                  >
                    Title
                  </label>
                  <input
                    data-testid="title"
                    id="title"
                    name="title"
                    value=""
                  />
                </div>
                <div
                  class="field"
                >
                  <label
                    for="content"
                  >
                    Content
                  </label>
                  <textarea
                    data-testid="content"
                    id="content"
                    name="content"
                  />
                </div>
                <div
                  class="field"
                >
                  <label
                    for="users"
                  >
                    Author
                  </label>
                  <div>
                    <div
                      class="sc-gsTCUz hrxIhJ"
                      data-testid="users"
                      id="users"
                      mode="pink"
                      name="users"
                    >
                      <input
                        class="selectInput"
                        data-testid="selectInput"
                        placeholder="choose the user"
                        type="text"
                        value=""
                      />
                      <ul
                        class="close"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="field"
                >
                  <button
                    class="sc-bdfBwQ eCPQds"
                    disabled=""
                    mode="pink"
                    type="button"
                  >
                    Add Post
                  </button>
                  <span />
                </div>
              </form>
            </section>
            <section
              class="posts-list"
            >
              <h2>
                Posts
              </h2>
              <div>
                loading...
              </div>
            </section>
          </main>
          <footer>
            copyright@2020 author ZUOQIN HU
          </footer>
        </div>
    `);
});
