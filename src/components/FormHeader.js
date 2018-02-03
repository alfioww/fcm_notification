import React from 'react';
import { 
    Container, Header, Left, Body, Right, Title, Text
} from 'native-base';

export const FormHeader = ({children}) => {
    return (
        <Container>
            <Header>
                <Left />
                    <Body>
                        <Title>
                            {children}
                        </Title>
                    </Body>
                <Right />
            </Header>
        </Container>
    )
}
