import { filter, sort } from "./filterSort";


describe("Testing filtering and sorting", () => {

    describe("filtering", () => {

        let dispatch;
        let list;

        beforeEach(() => {
            dispatch = vi.fn();
            list = [
                { id: 1, name: "Apple", product: "Fruit" },
                { id: 2, name: "Banana", product: "Fruit" },
                { id: 3, name: "Carrot", product: "Vegetable" },
            ];
        });

        test("filters list by name (case-insensitive)", () => {
            filter({ fullList: list, value: "apple", dispatch, type: "SET_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SET_LIST",
                payload: [{ id: 1, name: "Apple", product: "Fruit" }],
            });
        });

        test("filters list by product (case-insensitive)", () => {
            filter({ fullList: list, value: "vegetable", dispatch, type: "SET_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SET_LIST",
                payload: [{ id: 3, name: "Carrot", product: "Vegetable" }],
            });
        });

        test("returns full list if search key is empty", () => {
            filter({ fullList: list, value: "", dispatch, type: "SET_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SET_LIST",
                payload: list,
            });
        });

        test("returns empty list if nothing matches", () => {
            filter({ fullList: list, value: "zucchini", dispatch, type: "SET_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SET_LIST",
                payload: [],
            });
        });
    })


    describe("sorting", () => {
        let dispatch;
        let list;

        beforeEach(() => {
            dispatch = vi.fn();
            list = [
                { id: 1, name: "Banana", time: 10, favorite: 0, date: "2025-01-01", quantity: 5, obtained: 0, course: "Dessert", components: [] },
                { id: 2, name: "Apple", time: 5, favorite: 1, date: "2025-02-01", quantity: 3, obtained: 1, course: "Main", components: [] },
                { id: 3, product: "Carrot", time: 15, favorite: 0, date: "2025-03-01", quantity: 7, obtained: 0, course: "Side", components: [] },
            ];
        });

        test("sorts by time ascending", () => {
            sort({ fullList: list, value: "time", dispatch, type: "SORT_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SORT_LIST",
                payload: [
                    list[1],
                    list[0],
                    list[2],
                ],
            });
        });


        test("sorts by name alphabetically", () => {
            sort({ fullList: list, value: "name", dispatch, type: "SORT_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SORT_LIST",
                payload: [
                    list[1],
                    list[0],
                    list[2],
                ],
            });
        });

        test("sorts by favorite descending", () => {
            sort({ fullList: list, value: "fav", dispatch, type: "SORT_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SORT_LIST",
                payload: [
                    list[1],
                    list[0],
                    list[2],
                ],
            });
        });

        test("sorts by quantity descending", () => {
            sort({ fullList: list, value: "quantity", dispatch, type: "SORT_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SORT_LIST",
                payload: [
                    list[2], 
                    list[0],
                    list[1], 
                ],
            });
        });

        test("sorts by obtained descending", () => {
            sort({ fullList: list, value: "check", dispatch, type: "SORT_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SORT_LIST",
                payload: [
                    list[1],
                    list[0], 
                    list[2], 
                ],
            });
        });

        test("sorts by course ascending alphabetically", () => {
            sort({ fullList: list, value: "course", dispatch, type: "SORT_LIST" });

            expect(dispatch).toHaveBeenCalledWith({
                type: "SORT_LIST",
                payload: [
                    list[0], 
                    list[1], 
                    list[2], 
                ],
            });
        });


    })


})