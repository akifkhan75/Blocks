import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '../src/components/Card';
import { Text } from '../src/components/Typography';
import { BlocksProvider } from '../src/providers/BlocksProvider';
import { DefaultTheme } from '../src/themes/default';

describe('Card Component', () => {
  it('renders basic card correctly', () => {
    const { getByText } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Card>
          <Card.Content>
            <Text>Test Card</Text>
          </Card.Content>
        </Card>
      </BlocksProvider>
    );
    expect(getByText('Test Card')).toBeTruthy();
  });

  it('applies glass effect styles on iOS', () => {
    Platform.OS = 'ios';
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Card variant="glass" testID="glass-card">
          <Card.Content>
            <Text>Glass Card</Text>
          </Card.Content>
        </Card>
      </BlocksProvider>
    );
    expect(getByTestId('glass-card').props.style.backgroundColor).toBe('rgba(255, 255, 255, 0.2)');
  });

  it('renders with medium elevation by default', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Card testID="card">
          <Card.Content>
            <Text>Test Card</Text>
          </Card.Content>
        </Card>
      </BlocksProvider>
    );
    expect(getByTestId('card').props.elevation).toBe('medium');
  });

  it('allows custom padding in Card.Content', () => {
    const { getByTestId } = render(
      <BlocksProvider theme={DefaultTheme}>
        <Card>
          <Card.Content padding={24} testID="card-content">
            <Text>Test Card</Text>
          </Card.Content>
        </Card>
      </BlocksProvider>
    );
    expect(getByTestId('card-content').props.padding).toBe(24);
  });
});