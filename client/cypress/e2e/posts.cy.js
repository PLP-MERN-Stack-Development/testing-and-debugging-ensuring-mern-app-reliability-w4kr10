// posts.cy.js - End-to-end tests for posts functionality
describe('Posts Management', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/');
  });

  it('should display the homepage with posts', () => {
    // Check that the page loads
    cy.contains('h1', 'Blog Posts');
    
    // Check that posts are displayed
    cy.get('[data-testid="posts-list"]').should('exist');
    
    // Check that at least one post is visible
    cy.get('[data-testid="post-item"]').should('have.length.gte', 1);
  });

  it('should allow creating a new post', () => {
    // Click the create post button
    cy.get('[data-testid="create-post-btn"]').click();
    
    // Fill in the form
    cy.get('[data-testid="post-title"]').type('Test Post Title');
    cy.get('[data-testid="post-content"]').type('This is the content of the test post.');
    
    // Submit the form
    cy.get('[data-testid="submit-post"]').click();
    
    // Check that we're redirected to the posts list
    cy.url().should('include', '/posts');
    
    // Check that the new post appears in the list
    cy.contains('[data-testid="post-item"]', 'Test Post Title');
  });

  it('should allow viewing a post detail', () => {
    // Click on the first post in the list
    cy.get('[data-testid="post-item"]').first().click();
    
    // Check that we're on the post detail page
    cy.url().should('include', '/posts/');
    
    // Check that post title and content are displayed
    cy.get('[data-testid="post-title"]').should('exist');
    cy.get('[data-testid="post-content"]').should('exist');
  });

  it('should allow editing a post', () => {
    // Navigate to the first post
    cy.get('[data-testid="post-item"]').first().click();
    
    // Click the edit button
    cy.get('[data-testid="edit-post-btn"]').click();
    
    // Modify the content
    cy.get('[data-testid="post-content"]').clear().type('Updated content for the post.');
    
    // Submit the form
    cy.get('[data-testid="submit-post"]').click();
    
    // Check that the updated content is displayed
    cy.contains('[data-testid="post-content"]', 'Updated content for the post.');
  });

  it('should allow deleting a post', () => {
    // Navigate to the first post
    cy.get('[data-testid="post-item"]').first().click();
    
    // Click the delete button
    cy.get('[data-testid="delete-post-btn"]').click();
    
    // Confirm deletion
    cy.get('[data-testid="confirm-delete"]').click();
    
    // Check that we're redirected to the posts list
    cy.url().should('include', '/posts');
    
    // Check that the post no longer appears in the list
    cy.get('[data-testid="deleted-post"]').should('not.exist');
  });
});