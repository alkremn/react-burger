describe('can create order', function () {
  before(function () {
    cy.visit('http://localhost:3000');
    const dataTransfer = new DataTransfer();
    cy.get('[class^=burger-ingredient_listItem]').first().trigger('dragstart', { dataTransfer });
    cy.get('[class^=burger-constructor_container]').first().trigger('drop', { dataTransfer });
    cy.get('[class^=burger-ingredient_listItem]').eq(4).trigger('dragstart', { dataTransfer });
    cy.get('[class^=burger-constructor_container]').first().trigger('drop', { dataTransfer });
  });

  it('should show order button', function () {
    cy.get('[class^=button_button_]').contains('Оформить заказ');
  });

  it('should show order confirmation modal', function () {
    cy.get('[class^=button_button_]').contains('Оформить заказ').click();
    cy.get('[class^=order-details_container_]', { timeout: 30000 })
      .should('be.visible')
      .contains('Ваш заказ начали готовить');
  });
});
