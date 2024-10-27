import React from 'react';
import { View, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';

type DataTableProps = {
  tableHead: string[];
  tableData: any[][];
};

export const DataTable: React.FC<DataTableProps> = ({ tableHead, tableData }) => (
  <View className="text-white bg-slate-700 opacity-80 p-1 m-1 rounded-2xl">
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={{borderRadius: 16, paddingBottom: 2, paddingRight: 2}}>
          <Table borderStyle={{borderWidth: 5, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} />
            <Rows data={tableData} style={styles.row} />
          </Table>
        </View>
      </ScrollView>
    </View>
  </View>
);