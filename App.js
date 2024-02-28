import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BlueTitleBar from './BlueTitleBar';
import DepositedAmount from './DepositedAmount';
import EntityName from './EntityName';
import './common.css';

const App = () => {
  // Define options for the entity dropdown list
  const entityOptions = ['Entity 1', 'Entity 2', 'Entity 3'];

  // State variable to hold the selected entity
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Function to handle the selection of an entity
  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
  };

  return (
    <View style={styles.container}>
      {/* Blue Title Bar */}
      <BlueTitleBar title="Deposit" />

      {/* Deposited Amount Component */}
      <DepositedAmount />

      {/* Entity Name Component with Dropdown */}
      <EntityName
        options={entityOptions}
        selectedOption={selectedEntity}
        onSelect={handleSelectEntity}
      />

      {/* Add other components/content of your application */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
