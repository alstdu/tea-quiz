describe('Tea Personality Quiz', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('http://localhost:3000')
  })

  // Test 1: Basic Loading
  it('should load the quiz successfully', () => {
    cy.get('h1').should('contain', 'What Kind of Tea Are You?')
    cy.get('.quiz-container').should('exist')
  })

  // Test 2: First Question Display
  it('should display the first question', () => {
    cy.get('h2').should('contain', 'Question 1')
    cy.get('.options').children().should('have.length', 4)
  })

  // Test 3: Quiz Navigation
  it('should move to next question when answer is selected', () => {
    cy.get('.option-button').first().click()
    cy.get('h2').should('contain', 'Question 2')
  })

  // Test 4: Complete Quiz Flow
  it('should complete quiz and show results', () => {
    // Answer all questions with first option
    for (let i = 0; i < 7; i++) {
      cy.get('.option-button').first().click()
    }

    // Verify results page
    cy.get('h2').should('contain', 'Your Tea Personality Is')
    cy.get('.brewing-tips').should('exist')
  })

  // Test 5: Restart Function
  it('should restart quiz when clicking restart button', () => {
    // Complete quiz first
    for (let i = 0; i < 7; i++) {
      cy.get('.option-button').first().click()
    }

    // Click restart and verify
    cy.get('.restart-button').click()
    cy.get('h2').should('contain', 'Question 1')
  })
})
