import {config} from "dotenv";

// @ts-ignore
import {testTodoChange} from "./helpers";

config();

jest.mock("../src/TodoHandler")
jest.mock("../src/GitHubContext")

const context = require("../src/GitHubContext")

let existingIssues: any[] = [];

describe("Other TODO Change Tests", () => {

    beforeEach(() => {
        jest.resetModules()
        existingIssues = []
    })

    const test = (file: string, expects = {}) => testTodoChange("other", file, expects);

    context.getIssues.mockImplementation(() => ({data: existingIssues}))

    it("Move TODO", async () => {
        existingIssues.push({
            title: 'TODO should we reinvent the gear here?? üäö',
            number: 241,
            state: "open",
            assignees: []
        })
        await test("MoveComment")
    })

    it("Change without TODO", async () => {
        await test("None")
    })

    it("Reformat before TODO Tag", async () => {
        await test("ReformatBeforeTag")
    })

    it("Add TODO without Title", async () => {
        await test("TitleWithWhitespace")
    })
})