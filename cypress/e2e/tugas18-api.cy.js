describe("API Automation Testing using Cypress- ReqRes", () => {

    // TC001 - List User
    it("TC001 - GET List User", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.page).to.equal(2);
            expect(response.body.data).to.be.an("array");
            expect(response.body.data.length).to.be.greaterThan(0);

        });
    });


    // TC002 - Create User
    it("TC002 - POST Create User", () => {
        cy.request({
            method: "POST",
            url: "https://reqres.in/api/users",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            body: {
                name: "coco",
                job: "qa"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal("coco");
            expect(response.body.job).to.equal("qa");
            expect(response.body.id).to.exist;

        });
    });


    // TC003 - Update User (PUT)
    it("TC003 - PUT Update User", () => {
        cy.request({
            method: "PUT",
            url: "https://reqres.in/api/users/2",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            body: {
                name: "morpheus",
                job: "zion resident"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal("morpheus");
            expect(response.body.job).to.equal("zion resident");
            expect(response.body.updatedAt).to.exist;

        });
    });


    // TC004 - Update User (PATCH)
    it("TC004 - PATCH Update User", () => {
        cy.request({
            method: "PATCH",
            url: "https://reqres.in/api/users/2",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            body: {
                job: "zion resident"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.job).to.equal("zion resident");
            expect(response.body.updatedAt).to.exist;

        });
    });


    // TC005 - Delete User
    it("TC005 - DELETE User", () => {
        cy.request({
            method: "DELETE",
            url: "https://reqres.in/api/users/2",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(204);
            expect(response.body).to.be.empty;

        });
    });


    // TC006 - Single User
    it("TC006 - GET Single User", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users/2",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.data.id).to.equal(2);
            expect(response.body.data.email)
                .to.equal("janet.weaver@reqres.in");

        });
    });


    // TC007 - User Not Found
    it("TC007 - GET User Not Found", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users/23",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(404);
            expect(response.body).to.be.an("object");
            expect(response.body).to.be.empty;

        });
    });


    // TC008 - List Resource
    it("TC008 - GET List Resource", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/unknown",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.data).to.be.an("array");
            expect(response.body.data.length).to.be.greaterThan(0);

        });
    });


    // TC009 - Single Resource
    it("TC009 - GET Single Resource", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/unknown/2",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.data.id).to.equal(2);
            expect(response.body.data.name).to.equal("fuchsia rose");

        });
    });


    // TC010 - Resource Not Found
    it("TC010 - GET Resource Not Found", () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/unknown/23",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(404);
            expect(response.body).to.be.an("object");
            expect(response.body).to.be.empty;

        });
    });


    // TC011 - Register Success
    it("TC011 - POST Register Success", () => {
        cy.request({
            method: "POST",
            url: "https://reqres.in/api/register",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            body: {
                email: "eve.holt@reqres.in",
                password: "pistol"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.id).to.exist;
            expect(response.body.token).to.be.a("string").and.not.empty;

        });
    });


    // TC012 - Login Success
    it("TC012 - POST Login Success", () => {
        cy.request({
            method: "POST",
            url: "https://reqres.in/api/login",
            headers: {
                "x-api-key": "reqres_d91a4422044646088a6891b6c2db3d6f"
            },
            body: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            },
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a("string").and.not.empty;

        });
    });

});
