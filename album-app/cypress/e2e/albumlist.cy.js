describe("AlbumGrid", () => {
  it("renders album grid with correct props", () => {
    // Visit the page where the AlbumGrid component is rendered
    cy.visit("http://localhost:8080/");

    // Check if the correct number of albums is rendered
    cy.get(".album").should("have.length.greaterThan", 1 );

    // Check if each album is rendered with correct name and image
    cy.contains("Ghost Stories");
    cy.contains("Parachutes");
  });
});
