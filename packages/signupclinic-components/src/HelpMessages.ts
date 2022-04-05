const HelpMessages = {
  TRAININGS_DESCRIPTION:
    'Assign trainings to positions to restrict signups based on prerequisites. Add trainings to users in the volunteers drawer.',
  WELCOME:
    "Welcome to SignUpClinic. We're glad you have chosen to volunteer in our community!",
  CREATE_EVENT_DESCRIPTION: `Each event or template is a collection of positions that require volunteers.`,
  POSITIONTYPES_DESCRIPTION:
    'Positions with a lottery can be joined by any number of users. Admins confirm users when closing the lottery.',
  POSITION_POPPER_CHIP_DESCRIPTION:
    "Click on a user below to switch them between 'joined' and 'confirmed'.",
  CALENDAR_DESCRIPTION_NON_ADMIN:
    'First come first served positions show confirmed signups in the numerator (e.g. 3/5). Lottery positions allow unlimited and show a "-" in the numerator until closed (e.g. -/5).',
  ROSTER_DESCRIPTION:
    'New students receive an email to set up their account. They can view all events in your organization.',
  ADD_STUDENTS: 'Add users in the volunteers drawer at the top right.',
  TEMPLATE_DESCRIPTION:
    'Templates are predefined clinics that make it easier to create future events.',
} as const;

export default HelpMessages;
