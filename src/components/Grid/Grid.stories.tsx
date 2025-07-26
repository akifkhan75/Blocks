
// // Grid.Item = ({ children }) => <>{children}</>;

// // src/components/Grid/Grid.stories.tsx
// import React from 'react';
// import { Grid } from './Grid';
// import { BlocksProvider } from '../../providers/BlocksProvider';
// import { DefaultTheme } from '../../themes/default';
// import { Button } from '../Button/Button';
// import { Text } from '../Typography/Text';

// export default {
//   title: 'Components/Grid',
//   component: Grid,
//   decorators: [
//     (Story) => (
//       <BlocksProvider theme={DefaultTheme}>
//         <Story />
//       </BlocksProvider>
//     ),
//   ],
// };

// const Template = (args) => (
//   <Grid {...args}>
//     {[...Array(6)].map((_, i) => (
//       <Grid.Item key={i}>
//         <Button>Item {i + 1}</Button>
//       </Grid.Item>
//     ))}
//   </Grid>
// );

// export const TwoColumns = Template.bind({});
// TwoColumns.args = {
//   columns: 2,
// };

// export const ThreeColumns = Template.bind({});
// ThreeColumns.args = {
//   columns: 3,
// };

// export const WithSpacing = Template.bind({});
// WithSpacing.args = {
//   columns: 2,
//   spacing: 24,
// };
