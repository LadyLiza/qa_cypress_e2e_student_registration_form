/// <reference types='cypress' />

describe('Student Registration page', () => {
  const studentData = {
    firstName: 'Elizabeth',
    lastName: 'Smitt',
    email: 'smitt.2025@example.com',
    mobile: '0985863124',
    address: 'Skorupki 26',
    gender: 'Female',
    dateOfBirth: '06 January,1994',
    subjects: 'Computer Science',
    hobbies: 'Music',
    state: 'NCR',
    city: 'Delhi'
  };

  const expectedData = [
    { label: 'Student Name', value: `${studentData.firstName} ${studentData.lastName}` },
    { label: 'Student Email', value: studentData.email },
    { label: 'Gender', value: studentData.gender },
    { label: 'Mobile', value: studentData.mobile },
    { label: 'Date of Birth', value: studentData.dateOfBirth },
    { label: 'Subjects', value: studentData.subjects },
    { label: 'Hobbies', value: studentData.hobbies },
    { label: 'Address', value: studentData.address },
    { label: 'State and City', value: `${studentData.state} ${studentData.city}` }
  ];

  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('should fill the form and verify the modal data', () => {
    cy.get('#firstName').type(studentData.firstName);
    cy.get('#lastName').type(studentData.lastName);
    cy.get('#userEmail').type(studentData.email);
    cy.contains('label', studentData.gender).click();
    cy.get('#userNumber').type(studentData.mobile);

    const [day, month, year] = studentData.dateOfBirth
      .replace(',', ' ')
      .split(' ');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(month);
    cy.get('.react-datepicker__year-select').select(year);
    cy.get(`.react-datepicker__day--0${day}`)
      .not('.react-datepicker__day--outside-month')
      .click();

    cy.get('#subjectsInput').type(`${studentData.subjects}{enter}`);
    cy.contains('label', studentData.hobbies).click();
    cy.get('#currentAddress').type(studentData.address);

    cy.get('#state').click();
    cy.contains(`#react-select-3-option-0`, studentData.state).click();
    cy.get('#city').click();
    cy.contains(`#react-select-4-option-0`, studentData.city).click();

    cy.get('#submit').click();

    cy.get('.modal-content').should('be.visible');
    expectedData.forEach(({ label, value }) => {
      cy.get('table').contains(label).next().should('contain', value);
    });
  });
});
