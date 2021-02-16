import { ACCEPT_COOKIES_BUTTON, ADD_TO_BAG_BUTTON, MODAL_CLOSE_BUTTON, MODAL_ROOT, MODAL_SUBTOTAL, PRODUCT_CONTAINER, SIZE_SELECTOR } from '../support/selectors';

describe('Shop', function () {
	beforeEach(function () {
		// Supress geo redirection modal
		cy.setCookie('geoRedirectionAlreadySuggested', 'true');
	});

	it('should select the first pair of men\'s shoes, go to product page, select size and add it to bag', function () {
		cy.intercept('POST', '/personalizationengine', {fixture: 'personalizationEngine.json'});
		cy.intercept('GET', '/availability', {fixture: 'availability.json'});
		cy.intercept('POST', '/items', {fixture: 'items.json'});

		cy.visit('/men-shoes', {
			headers: {
				'Accept-Encoding': 'gzip, deflate'
			}
		});
	
		// Accept cookies
		cy.get(`${MODAL_ROOT} ${ACCEPT_COOKIES_BUTTON}`).click();

		// Click on the name of the first product in the grid
		cy.get(`${PRODUCT_CONTAINER} [data-index=0] .gl-product-card__details a`).click();

		// Close newsletter modal
		cy.get(`${MODAL_ROOT} ${MODAL_CLOSE_BUTTON}`).click();

		// Select size
		cy.get(`${SIZE_SELECTOR} button:first-of-type`).click();

		// Add to bag
		cy.get(ADD_TO_BAG_BUTTON).click();

		cy.get(`${MODAL_ROOT} .gl-modal__main-content .gl-heading`).contains('Successfully added to bag!').should('be.visible');
		cy.get(`${MODAL_ROOT} ${MODAL_SUBTOTAL}`).should(function ($element) {
			expect($element).to.contain('100');
		});
	});
})
