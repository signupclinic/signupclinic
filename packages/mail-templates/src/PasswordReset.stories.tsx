import PasswordReset from './PasswordReset';
import { baseStoryArgs } from './utils';

export default {
  component: PasswordReset,
  title: 'Mail/PasswordReset',
};

export const Primary = PasswordReset.bind({});
Primary.args = baseStoryArgs;
