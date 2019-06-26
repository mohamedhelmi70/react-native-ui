import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const personList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.persons}
      renderItem={(info) => (
        <ListItem
          personName={info.item.name}
          personImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default personList;