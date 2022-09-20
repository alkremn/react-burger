describe('is ingredient draggable', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should drag and drop ingredient', function () {
    const dataTransfer = new DataTransfer();
    cy.get('[class^=burger-ingredient_listItem]').first().trigger('dragstart', {
      dataTransfer,
    });

    cy.get('[class^=burger-constructor_container]').first().trigger('drop', {
      dataTransfer,
    });
  });
});
