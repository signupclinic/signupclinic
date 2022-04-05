const { sendMail, ...emails } = require('../dist/index.js');

async function build() {
  process.env.BUILDING = 1;
  await Promise.all(
    Object.keys(emails).map(async (email) => emails[email]({}))
  );
}

build();
