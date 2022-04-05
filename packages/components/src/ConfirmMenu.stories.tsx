import React, { useRef, useState } from 'react';
import { ComponentStory } from '@storybook/react';
import ConfirmMenu from './ConfirmMenu';

export default {
  component: ConfirmMenu,
  title: 'ConfirmMenu',
};

function Wrapper(props) {
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <button type="button" onClick={(e) => setAnchor(e.target)}>
        click me
      </button>
      <ConfirmMenu
        {...props}
        onClose={() => setAnchor(null)}
        anchorEl={anchor}
      />
    </>
  );
}

export const Primary: ComponentStory<typeof ConfirmMenu> = Wrapper.bind({});
Primary.args = { onDelete: () => {} };
