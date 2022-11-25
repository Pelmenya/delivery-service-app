import React from 'react';
import {
    ComponentStory,
    ComponentMeta,
} from '@storybook/react';

import { Loader } from './loader';

export default {
    title: 'News/components/Loader',
    component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = () => (
    <Loader />
);

export const LoaderIsOpen = Template.bind({});
