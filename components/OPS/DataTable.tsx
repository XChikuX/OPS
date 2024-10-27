import React from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';

type DataTableProps = {
  tableHead: string[];
  tableData: any[][];
};

const handleCellPress = (value: string) => {
  console.log(`Pressed ${value}`);
  Alert.alert(`Pressed ${value}`);
};


export const DataTable: React.FC<DataTableProps> = ({ tableHead, tableData }) => {
  const renderCell = (value: string) => (
    <TouchableOpacity onPress={() => handleCellPress(value)}>
      <Text style={styles.cellText}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View style={styles.tableWrapper}>
            <Table borderStyle={styles.tableBorder}>
              <Row 
                data={tableHead}
                style={styles.header}
                textStyle={styles.headerText}
              />
              <Rows 
                data={tableData.map(row => row.map(cell => renderCell(cell)))}
                style={styles.row}
              />
            </Table>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'rgba(51, 65, 85, 0.8)',
    padding: 4,
    margin: 4,
    borderRadius: 16,
  },
  container: { 
    flex: 1,
    padding: 2,
    paddingTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableWrapper: {
    borderRadius: 16,
    paddingBottom: 2,
    paddingRight: 2,
  },
  tableBorder: {
    borderWidth: 5,
    borderColor: '#c8e1ff',
  },
  header: {
    height: 40,
    backgroundColor: '#f1f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 4,
  },
  row: {
    height: 28,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 4,
    paddingVertical: 2,
  }
});

export default DataTable;