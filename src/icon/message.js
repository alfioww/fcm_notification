import React from 'react';
import { Image } from 'react-native';
import MessageIcon from '../image/message.png';

export const message = (props) => {
    return (
         <Image
           source={MessageIcon}
           style={{ tintColor: props.focused ? 'black' : 'grey', width: 25, height: 25 }}
         />
    );
};
