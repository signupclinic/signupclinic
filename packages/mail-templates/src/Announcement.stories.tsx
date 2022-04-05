import Announcement from './Announcement';
import { baseStoryArgs } from './utils';

export default {
  component: Announcement,
  title: 'Mail/Announcement',
};

export const Primary = Announcement.bind({});
Primary.args = {
  ...baseStoryArgs,
  senderName: 'Sender Name',
  message: 'How is it going',
};
