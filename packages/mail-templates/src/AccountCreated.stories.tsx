import AccountCreated from './AccountCreated';
import { baseStoryArgs } from './utils';

export default {
  component: AccountCreated,
  title: 'Mail/AccountCreated',
};

export const Primary = AccountCreated.bind({});
Primary.args = baseStoryArgs;
