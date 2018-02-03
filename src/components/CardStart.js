import React from 'react';
import { View } from 'react-native';

const CardStart = (props) => {
    return (
        <View style={styles.containerStyle}>
         {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        // flexDirection: 'row',
        position: 'relative',
        // borderRadius: 20

    }
};

export { CardStart };
